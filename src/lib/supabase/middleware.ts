import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_SCHEMA } from "@/lib/supabase/constants";
import type { Database } from "@/lib/supabase/types";

/**
 * Refreshes Supabase session. For /admin (except login), redirects
 * unauthenticated users to /admin/login. Logged-in admins on /admin/login
 * redirect to /admin.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const pathname = request.nextUrl.pathname;
  const isAdminPath = pathname.startsWith("/admin");
  const isLoginPath = pathname === "/admin/login";

  if (!url || !anonKey) {
    if (isAdminPath && !isLoginPath) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient<Database>(url, anonKey, {
    db: { schema: SUPABASE_SCHEMA },
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminPath) {
    return supabaseResponse;
  }

  if (!user) {
    if (isLoginPath) return supabaseResponse;
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) {
    await supabase.auth.signOut();
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPath) {
    const dash = request.nextUrl.clone();
    dash.pathname = "/admin";
    return NextResponse.redirect(dash);
  }

  return supabaseResponse;
}
