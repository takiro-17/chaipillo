(function() {
    var STORAGE_KEY = 'fitconnect_live_entry_requests_v1';
    var CHANNEL_NAME = 'fitconnect_live_entry_requests_channel_v1';
    var EVENT_NAME = 'fitconnect-entry-requests-updated';
    var MAX_CACHE_ITEMS = 200;
    var REQUEST_TTL_MS = 2 * 60 * 1000;
    var listeners = [];
    var instanceId = 'bridge-' + Math.random().toString(16).slice(2) + '-' + Date.now();
    var channel = null;
    var expiryTimer = null;
    var requestCache = safeParse(localStorage.getItem(STORAGE_KEY), []);
    var remoteSyncStarted = false;
    var remoteSubscription = null;
    var remoteSyncPromise = null;

    try {
        if (typeof BroadcastChannel !== 'undefined') {
            channel = new BroadcastChannel(CHANNEL_NAME);
        }
    } catch (error) {
        channel = null;
    }

    function safeParse(raw, fallbackValue) {
        if (!raw) return fallbackValue;

        try {
            return JSON.parse(raw);
        } catch (error) {
            return fallbackValue;
        }
    }

    function normalizeString(value) {
        return (value || '').toString().trim();
    }

    function normalizeName(value) {
        return normalizeString(value).toLowerCase();
    }

    function getRequestUpdatedAtMs(request) {
        var updatedAtMs = new Date((request && (request.updatedAt || request.resolvedAt || request.requestedAt)) || 0).getTime();
        return isFinite(updatedAtMs) ? updatedAtMs : 0;
    }

    function getStatusRank(status) {
        switch (normalizeString(status)) {
            case 'approved':
                return 4;
            case 'cancelled':
                return 3;
            case 'expired':
                return 2;
            case 'rejected':
                return 1;
            default:
                return 0;
        }
    }

    function compareByNewest(a, b) {
        var aTime = getRequestUpdatedAtMs(a);
        var bTime = getRequestUpdatedAtMs(b);
        return bTime - aTime;
    }

    function sortAndTrim(requests) {
        return (Array.isArray(requests) ? requests.slice() : []).sort(compareByNewest).slice(0, MAX_CACHE_ITEMS);
    }

    function getRequestExpiresAt(request) {
        var requestedAt = request && (request.requestedAt || request.updatedAt);
        var requestedAtMs = new Date(requestedAt || Date.now()).getTime();
        if (!isFinite(requestedAtMs)) {
            requestedAtMs = Date.now();
        }
        return new Date(requestedAtMs + REQUEST_TTL_MS).toISOString();
    }

    function getRequestRemainingMs(request) {
        return Math.max(0, new Date(getRequestExpiresAt(request)).getTime() - Date.now());
    }

    function isRequestExpired(request) {
        return normalizeString(request && request.status) === 'pending' && getRequestRemainingMs(request) <= 0;
    }

    function decorateRequest(request) {
        var expiresAt = getRequestExpiresAt(request);
        return Object.assign({}, request, {
            expiresAt: expiresAt,
            msRemaining: Math.max(0, new Date(expiresAt).getTime() - Date.now()),
            isExpired: normalizeString(request && request.status) === 'expired' || isRequestExpired(request)
        });
    }

    function scheduleNextExpiryCheck() {
        if (expiryTimer) {
            clearTimeout(expiryTimer);
            expiryTimer = null;
        }

        var soonestExpiry = null;
        readAllRequests().forEach(function(request) {
            if (normalizeString(request.status) !== 'pending') return;

            var expiresAtMs = new Date(getRequestExpiresAt(request)).getTime();
            if (!isFinite(expiresAtMs)) return;

            if (soonestExpiry == null || expiresAtMs < soonestExpiry) {
                soonestExpiry = expiresAtMs;
            }
        });

        if (soonestExpiry == null) return;

        expiryTimer = setTimeout(function() {
            expiryTimer = null;
            if (!expireStalePendingRequests('request-expired')) {
                scheduleNextExpiryCheck();
            }
        }, Math.max(250, soonestExpiry - Date.now() + 50));
    }

    function writeCache(requests) {
        requestCache = sortAndTrim(requests);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(requestCache));
        scheduleNextExpiryCheck();
        return requestCache;
    }

    function readAllRequests() {
        return sortAndTrim(requestCache);
    }

    function notifyListeners(reason) {
        var snapshot = readAllRequests();
        listeners.slice().forEach(function(listener) {
            try {
                listener(snapshot, reason || 'update');
            } catch (error) {
                console.error('Entry bridge listener failed', error);
            }
        });
    }

    function emit(reason) {
        notifyListeners(reason);

        if (!channel) return;

        try {
            channel.postMessage({
                type: EVENT_NAME,
                source: instanceId,
                reason: reason || 'update'
            });
        } catch (error) {
            console.warn('Entry bridge broadcast failed', error);
        }
    }

    function requestMatchesFilters(request, filters) {
        if (!filters) return true;

        if (filters.id && request.id !== filters.id) return false;
        if (filters.status && request.status !== filters.status) return false;
        if (Array.isArray(filters.statuses) && filters.statuses.length > 0 && filters.statuses.indexOf(request.status) === -1) return false;
        if (filters.gymId != null && request.gymId !== filters.gymId) return false;
        if (filters.userPhone && normalizeString(request.userPhone) !== normalizeString(filters.userPhone)) return false;
        if (filters.userName && normalizeName(request.userName) !== normalizeName(filters.userName)) return false;
        if (filters.gymName && normalizeName(request.gymName) !== normalizeName(filters.gymName)) return false;
        return true;
    }

    function mergeRequestSets(primaryRequests, secondaryRequests) {
        var mergedMap = {};

        function upsertRequest(request) {
            var requestId = normalizeString(request && request.id);
            if (!requestId) return;

            var existing = mergedMap[requestId];
            if (!existing) {
                mergedMap[requestId] = Object.assign({}, request);
                return;
            }

            var existingUpdatedAtMs = getRequestUpdatedAtMs(existing);
            var nextUpdatedAtMs = getRequestUpdatedAtMs(request);
            if (nextUpdatedAtMs > existingUpdatedAtMs) {
                mergedMap[requestId] = Object.assign({}, existing, request);
                return;
            }

            if (nextUpdatedAtMs === existingUpdatedAtMs && getStatusRank(request.status) > getStatusRank(existing.status)) {
                mergedMap[requestId] = Object.assign({}, existing, request);
            }
        }

        (Array.isArray(primaryRequests) ? primaryRequests : []).forEach(upsertRequest);
        (Array.isArray(secondaryRequests) ? secondaryRequests : []).forEach(upsertRequest);
        return Object.keys(mergedMap).map(function(requestId) {
            return mergedMap[requestId];
        });
    }

    function getRequests(filters) {
        ensureRemoteSync();
        expireStalePendingRequests('request-expired');
        return readAllRequests().filter(function(request) {
            return requestMatchesFilters(request, filters);
        }).map(function(request) {
            return decorateRequest(request);
        });
    }

    function getRequestById(requestId) {
        return getRequests({ id: normalizeString(requestId) })[0] || null;
    }

    function buildRequestId() {
        return 'entry-' + Date.now() + '-' + Math.random().toString(16).slice(2, 8);
    }

    function generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    function getClient() {
        if (typeof window.getFitConnectSupabase === 'function') {
            return window.getFitConnectSupabase();
        }
        return window.supabaseAPI || null;
    }

    function mapRemoteRowToRequest(row) {
        var sourceApp = normalizeString(row.source_app || 'UserApp');
        var status = normalizeString(row.status || 'pending') || 'pending';
        if (status === 'rejected' && /:cancelled$/i.test(sourceApp)) {
            status = 'cancelled';
        }

        return {
            id: normalizeString(row.id),
            otp: normalizeString(row.otp),
            gymId: row.gym_id == null ? null : row.gym_id,
            membershipId: row.membership_id == null ? null : row.membership_id,
            memberUserId: row.member_user_id == null ? null : row.member_user_id,
            gymName: normalizeString(row.gym_name),
            userName: normalizeString(row.user_name),
            userPhone: normalizeString(row.user_phone),
            membershipPlan: normalizeString(row.membership_plan),
            status: status,
            requestedAt: row.requested_at || row.created_at || new Date().toISOString(),
            updatedAt: row.updated_at || row.requested_at || new Date().toISOString(),
            sourceApp: sourceApp,
            approvedAt: row.approved_at || null,
            rejectedAt: row.rejected_at || null,
            resolvedAt: row.resolved_at || null,
            ownerGymName: normalizeString(row.owner_gym_name || '')
        };
    }

    function mapRequestToRemoteRow(request) {
        var normalizedSourceApp = normalizeString(request.sourceApp || 'UserApp').replace(/:cancelled$/i, '');
        var remoteStatus = request.status === 'cancelled' ? 'rejected' : request.status;
        var remoteSourceApp = request.status === 'cancelled'
            ? normalizedSourceApp + ':cancelled'
            : normalizedSourceApp;

        return {
            id: request.id,
            otp: request.otp,
            gym_id: request.gymId,
            membership_id: request.membershipId || null,
            member_user_id: request.memberUserId || null,
            gym_name: request.gymName,
            user_name: request.userName,
            user_phone: request.userPhone,
            membership_plan: request.membershipPlan,
            status: remoteStatus,
            requested_at: request.requestedAt,
            updated_at: request.updatedAt,
            source_app: remoteSourceApp,
            approved_at: request.approvedAt || null,
            rejected_at: request.rejectedAt || null,
            resolved_at: request.resolvedAt || null,
            owner_gym_name: request.ownerGymName || null
        };
    }

    function upsertRemoteRequest(request) {
        var client = getClient();
        if (!client) return Promise.resolve(null);

        return client
            .from('entry_requests')
            .upsert(mapRequestToRemoteRow(request), { onConflict: 'id' })
            .then(function(result) {
                if (result && result.error) {
                    console.warn('Entry request sync failed', result.error);
                }
                return result;
            })
            .catch(function(error) {
                console.warn('Entry request sync failed', error);
                return null;
            });
    }

    function refreshFromRemote(reason) {
        var client = getClient();
        if (!client) return Promise.resolve(readAllRequests());

        if (remoteSyncPromise) return remoteSyncPromise;

        remoteSyncPromise = client
            .from('entry_requests')
            .select('*')
            .order('requested_at', { ascending: false })
            .limit(MAX_CACHE_ITEMS)
            .then(function(result) {
                remoteSyncPromise = null;

                if (result && result.error) {
                    console.warn('Entry request fetch failed', result.error);
                    return readAllRequests();
                }

                var remoteRequests = Array.isArray(result.data)
                    ? result.data.map(mapRemoteRowToRequest)
                    : [];

                writeCache(mergeRequestSets(readAllRequests(), remoteRequests));
                if (!expireStalePendingRequests('request-expired')) {
                    emit(reason || 'remote-refresh');
                }
                return readAllRequests();
            })
            .catch(function(error) {
                remoteSyncPromise = null;
                console.warn('Entry request fetch failed', error);
                return readAllRequests();
            });

        return remoteSyncPromise;
    }

    function ensureRemoteSync() {
        if (remoteSyncStarted) return;

        var client = getClient();
        if (!client) return;

        remoteSyncStarted = true;
        refreshFromRemote('remote-bootstrap');

        try {
            remoteSubscription = client
                .channel('fitconnect-entry-requests-db')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'entry_requests' },
                    function() {
                        refreshFromRemote('remote-change');
                    }
                )
                .subscribe();
        } catch (error) {
            console.warn('Entry request realtime subscribe failed', error);
        }
    }

    function createRequest(payload) {
        ensureRemoteSync();

        var now = new Date().toISOString();
        var request = {
            id: buildRequestId(),
            otp: payload && payload.otp ? normalizeString(payload.otp) : generateOtp(),
            gymId: payload && payload.gymId != null ? payload.gymId : null,
            membershipId: payload && payload.membershipId ? payload.membershipId : null,
            memberUserId: payload && payload.memberUserId ? payload.memberUserId : null,
            gymName: payload && payload.gymName ? normalizeString(payload.gymName) : '',
            userName: payload && payload.userName ? normalizeString(payload.userName) : 'Member',
            userPhone: payload && payload.userPhone ? normalizeString(payload.userPhone) : '',
            membershipPlan: payload && payload.membershipPlan ? normalizeString(payload.membershipPlan) : '',
            status: 'pending',
            requestedAt: now,
            updatedAt: now,
            sourceApp: payload && payload.sourceApp ? normalizeString(payload.sourceApp) : 'UserApp',
            approvedAt: null,
            rejectedAt: null,
            resolvedAt: null,
            ownerGymName: ''
        };

        var requests = readAllRequests();
        requests.push(request);
        writeCache(requests);
        emit('request-created');
        upsertRemoteRequest(request);
        return request;
    }

    function updateRequest(requestId, updater, reason) {
        ensureRemoteSync();

        var changedRequest = null;
        var requests = readAllRequests().map(function(request) {
            if (normalizeString(request.id) !== normalizeString(requestId)) return request;

            var nextRequest = Object.assign({}, request);
            if (typeof updater === 'function') {
                nextRequest = updater(nextRequest) || nextRequest;
            }
            nextRequest.updatedAt = new Date().toISOString();
            changedRequest = nextRequest;
            return nextRequest;
        });

        if (!changedRequest) return null;

        writeCache(requests);
        emit(reason || 'request-updated');
        upsertRemoteRequest(changedRequest);
        return changedRequest;
    }

    function expireStalePendingRequests(reason) {
        var expiredRequests = [];
        var requests = readAllRequests().map(function(request) {
            if (!isRequestExpired(request)) return request;

            var expiresAt = getRequestExpiresAt(request);
            var nextRequest = Object.assign({}, request, {
                status: 'expired',
                resolvedAt: expiresAt,
                updatedAt: expiresAt
            });
            expiredRequests.push(nextRequest);
            return nextRequest;
        });

        if (!expiredRequests.length) return false;

        writeCache(requests);
        emit(reason || 'request-expired');
        expiredRequests.forEach(function(request) {
            upsertRemoteRequest(request);
        });
        return true;
    }

    function resolveRequest(requestId, status, extraFields) {
        return updateRequest(requestId, function(request) {
            request.status = status;
            request.resolvedAt = extraFields && extraFields.resolvedAt ? extraFields.resolvedAt : new Date().toISOString();

            if (extraFields && typeof extraFields === 'object') {
                Object.keys(extraFields).forEach(function(key) {
                    request[key] = extraFields[key];
                });
            }

            return request;
        }, 'request-resolved');
    }

    function cancelRequest(requestId) {
        var now = new Date().toISOString();
        return resolveRequest(requestId, 'cancelled', {
            resolvedAt: now,
            rejectedAt: now
        });
    }

    function pruneResolvedRequests(limit) {
        var maxItems = typeof limit === 'number' && limit > 0 ? limit : MAX_CACHE_ITEMS;
        var requests = readAllRequests();
        if (requests.length <= maxItems) return requests;

        writeCache(requests.slice(0, maxItems));
        emit('request-pruned');
        return readAllRequests();
    }

    function subscribe(listener) {
        if (typeof listener !== 'function') {
            return function() {};
        }

        listeners.push(listener);
        ensureRemoteSync();

        return function unsubscribe() {
            listeners = listeners.filter(function(item) {
                return item !== listener;
            });
        };
    }

    if (channel) {
        channel.addEventListener('message', function(event) {
            if (!event || !event.data || event.data.type !== EVENT_NAME) return;
            if (event.data.source === instanceId) return;
            notifyListeners(event.data.reason || 'broadcast');
        });
    }

    window.addEventListener('storage', function(event) {
        if (event.key === STORAGE_KEY) {
            requestCache = safeParse(event.newValue, []);
            notifyListeners('storage');
        }
    });

    ensureRemoteSync();

    window.FitConnectEntryBridge = {
        storageKey: STORAGE_KEY,
        requestTtlMs: REQUEST_TTL_MS,
        readAllRequests: readAllRequests,
        getRequests: getRequests,
        getPendingRequests: function(filters) {
            var nextFilters = Object.assign({}, filters || {}, { status: 'pending' });
            return getRequests(nextFilters);
        },
        getRequestById: getRequestById,
        createRequest: createRequest,
        updateRequest: updateRequest,
        resolveRequest: resolveRequest,
        cancelRequest: cancelRequest,
        generateOtp: generateOtp,
        getRequestExpiresAt: getRequestExpiresAt,
        getRequestRemainingMs: getRequestRemainingMs,
        isRequestExpired: isRequestExpired,
        normalizeName: normalizeName,
        refreshFromRemote: refreshFromRemote,
        subscribe: subscribe,
        expireStalePendingRequests: expireStalePendingRequests,
        pruneResolvedRequests: pruneResolvedRequests
    };
})();

(function() {
    function getCurrentPageName() {
        var path = String(window.location.pathname || '');
        var parts = path.split('/');
        return String(parts[parts.length - 1] || '').toLowerCase();
    }

    function hideFloatingCartOutsideStore() {
        var cartFab = document.getElementById('cartFab');
        if (!cartFab) return;

        if (getCurrentPageName() !== 'store.html') {
            cartFab.style.display = 'none';
        } else {
            cartFab.style.display = '';
        }
    }

    function refreshReviewGateCopy() {
        var noteBlocks = document.querySelectorAll('.review-gate-note > div');
        if (!noteBlocks || !noteBlocks.length) return;

        Array.prototype.forEach.call(noteBlocks, function(node) {
            var currentText = String(node.textContent || '').trim();
            if (currentText === 'Review unlocked after you join this gym') {
                node.textContent = 'Only members of this gym can review';
            }
        });
    }

    function applyUserAppHotfixes() {
        hideFloatingCartOutsideStore();
        refreshReviewGateCopy();
    }

    function startHotfixObserver() {
        if (!window.MutationObserver || !document.body || window.__fitConnectHotfixObserverStarted) return;

        window.__fitConnectHotfixObserverStarted = true;
        var observer = new MutationObserver(function() {
            applyUserAppHotfixes();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            applyUserAppHotfixes();
            startHotfixObserver();
        });
    } else {
        applyUserAppHotfixes();
        startHotfixObserver();
    }

    window.addEventListener('load', applyUserAppHotfixes);
})();
