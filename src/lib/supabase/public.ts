import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_SCHEMA } from "@/lib/supabase/constants";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { createTimedFetch } from "@/lib/supabase/fetch";
import type { Database } from "@/lib/supabase/types";

/**
 * Cookie-free anon client for public CMS reads.
 * Using `cookies()` opts routes into dynamic rendering and makes soft
 * navigations wait on a full server round-trip — avoid that for published data.
 */
export function createPublicClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createSupabaseClient<Database>(url, anonKey, {
    db: { schema: SUPABASE_SCHEMA },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: createTimedFetch(),
    },
  });
}
