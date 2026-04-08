// Supabase configuration
const SUPABASE_URL = "https://nvfnpdjlpslroozyitnx.supabase.co";
const SUPABASE_KEY = "sb_publishable_939i61LkXOpXbXGU0YB-3g_ifr0_sic";

const OWNER_STORAGE_KEY = "fitconnect_owner";
const PENDING_OWNER_KEY = "fitconnect_pending_owner_profile";
const PENDING_OWNER_MAX_AGE_MS = 24 * 60 * 60 * 1000;

// Initialize Supabase (requires the CDN script to be loaded first)
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

window.supabaseAPI = supabaseClient;
window.fitconnectStorageKeys = {
    owner: OWNER_STORAGE_KEY,
    pendingOwner: PENDING_OWNER_KEY
};

// Store the original localStorage.setItem before monkey-patching.
window._backupSetItem = localStorage.setItem.bind(localStorage);

window.isHostedAuthContext = function() {
    return /^https?:$/i.test(window.location.protocol);
};

window.getPageUrl = function(pageName) {
    return new URL(pageName, window.location.href).toString();
};

window.getHostedPageUrl = function(pageName) {
    try {
        const resolved = new URL(pageName, window.location.href);
        if (!/^https?:$/i.test(resolved.protocol)) return null;
        return resolved.toString();
    } catch (error) {
        return null;
    }
};

window.cachePendingOwnerProfile = function(profile) {
    if (!profile) return;
    const payload = Object.assign({}, profile, { cachedAt: Date.now() });
    window._backupSetItem(PENDING_OWNER_KEY, JSON.stringify(payload));
};

window.readPendingOwnerProfile = function() {
    const raw = localStorage.getItem(PENDING_OWNER_KEY);
    if (!raw) return null;

    try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") {
            localStorage.removeItem(PENDING_OWNER_KEY);
            return null;
        }

        if (parsed.cachedAt && Date.now() - parsed.cachedAt > PENDING_OWNER_MAX_AGE_MS) {
            localStorage.removeItem(PENDING_OWNER_KEY);
            return null;
        }

        return parsed;
    } catch (error) {
        localStorage.removeItem(PENDING_OWNER_KEY);
        return null;
    }
};

window.clearPendingOwnerProfile = function() {
    localStorage.removeItem(PENDING_OWNER_KEY);
};

window.buildOwnerDataFromSession = function(session) {
    const user = session && session.user ? session.user : null;
    if (!user) return null;

    const pending = window.readPendingOwnerProfile();
    const pendingMatches = !!pending && (
        pending.allowAnyEmail ||
        !pending.email ||
        !user.email ||
        pending.email.toLowerCase() === user.email.toLowerCase()
    );

    const metadata = user.user_metadata || {};
    const seed = pendingMatches ? pending : {};

    if (pendingMatches) {
        window.clearPendingOwnerProfile();
    }

    return {
        gymName: seed.gymName || metadata.gym_name || metadata.gymName || "My Gym",
        location: seed.location || metadata.location || "",
        phone: seed.phone || metadata.phone || "",
        capacity: seed.capacity || metadata.capacity || "",
        email: user.email || seed.email || "",
        members: Array.isArray(seed.members) ? seed.members : [],
        attendanceLog: Array.isArray(seed.attendanceLog) ? seed.attendanceLog : [],
        communityMessages: Array.isArray(seed.communityMessages) ? seed.communityMessages : []
    };
};

// Push dashboard data to the cloud when a session exists.
window.saveToCloud = async function(ownerData) {
    const { data: { session } } = await window.supabaseAPI.auth.getSession();
    if (!session) return false;

    const { error } = await window.supabaseAPI
        .from("gyms")
        .upsert({
            id: session.user.id,
            owner_user_id: session.user.id,
            name: ownerData && ownerData.gymName ? ownerData.gymName : "My Gym",
            location: ownerData && ownerData.location ? ownerData.location : "",
            phone: ownerData && ownerData.phone ? ownerData.phone : "",
            data: ownerData,
            is_published: true,
            updated_at: new Date().toISOString()
        });

    if (error) {
        console.error("Cloud Sync Error", error);
        return false;
    }

    return true;
};

// Monkey-patch localStorage to keep the cloud row updated automatically.
localStorage.setItem = function(key, value) {
    window._backupSetItem(key, value);
    if (key === OWNER_STORAGE_KEY && window.saveToCloud) {
        try {
            window.saveToCloud(JSON.parse(value));
        } catch (error) {
            console.error("Owner cache parse error", error);
        }
    }
};

// Fetch the gym profile from the cloud on dashboard launch.
window.fetchFromCloud = async function() {
    const { data: { session } } = await window.supabaseAPI.auth.getSession();
    if (!session) return null;

    const { data, error } = await window.supabaseAPI
        .from("gyms")
        .select("id, name, location, phone, data")
        .eq("id", session.user.id)
        .single();

    if (error || !data) return null;

    const fallback = {
        gymName: data.name || (session.user.user_metadata && (session.user.user_metadata.gym_name || session.user.user_metadata.gymName)) || "My Gym",
        location: data.location || (session.user.user_metadata && session.user.user_metadata.location) || "",
        phone: data.phone || (session.user.user_metadata && session.user.user_metadata.phone) || "",
        capacity: session.user.user_metadata && session.user.user_metadata.capacity ? session.user.user_metadata.capacity : "",
        email: session.user.email || "",
        members: [],
        attendanceLog: [],
        communityMessages: []
    };

    if (data.data && typeof data.data === "object") {
        return Object.assign({}, fallback, data.data, {
            gymName: data.data.gymName || fallback.gymName,
            location: data.data.location || fallback.location,
            phone: data.data.phone || fallback.phone,
            capacity: data.data.capacity || fallback.capacity,
            email: data.data.email || fallback.email
        });
    }

    return fallback;
};

window.requireSession = async function(redirectPage) {
    const { data: { session } } = await window.supabaseAPI.auth.getSession();
    if (session) return session;

    if (redirectPage) {
        window.location.href = window.getPageUrl(redirectPage);
    }
    return null;
};

window.signOutOwner = async function() {
    try {
        await window.supabaseAPI.auth.signOut();
    } catch (error) {
        console.error("Sign out failed", error);
    }

    localStorage.removeItem(OWNER_STORAGE_KEY);
    window.location.href = window.getPageUrl("index.html");
};
