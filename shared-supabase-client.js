(function() {
    var SUPABASE_URL = 'https://nvfnpdjlpslroozyitnx.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_939i61LkXOpXbXGU0YB-3g_ifr0_sic';

    function getClient() {
        if (window.supabaseAPI) return window.supabaseAPI;
        if (window._fitconnectSupabaseClient) return window._fitconnectSupabaseClient;
        if (!window.supabase || typeof window.supabase.createClient !== 'function') return null;

        window._fitconnectSupabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        return window._fitconnectSupabaseClient;
    }

    window.FitConnectSupabaseConfig = {
        url: SUPABASE_URL,
        key: SUPABASE_KEY
    };

    window.getFitConnectSupabase = getClient;
})();
