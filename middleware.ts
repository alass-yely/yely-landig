import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getPostLoginRedirectPath } from "@/lib/utils/auth-redirect";
import {
  isValidAppRole,
  YELY_ROLE_COOKIE,
  YELY_SESSION_COOKIE,
} from "@/lib/utils/auth-cookie";
import type { AppRole } from "@/lib/utils/auth-cookie";

function isPrivateRoute(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/organisation-dashboard") ||
    pathname.startsWith("/station-dashboard")
  );
}

function isAuthRoute(pathname: string) {
  return pathname === "/login" || pathname.startsWith("/register") || pathname === "/organisation";
}

function isRoleAllowedForPath(pathname: string, role: AppRole) {

  if (pathname.startsWith("/admin")) {
    return role === "YELY_ADMIN";
  }

  if (pathname.startsWith("/organisation-dashboard")) {
    return role === "ORG_OWNER" || role === "ORG_MANAGER";
  }

  if (pathname.startsWith("/station-dashboard")) {
    return role === "STATION_OWNER" || role === "STATION_MANAGER" || role === "CASHIER";
  }

  return true;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const hasSession = request.cookies.get(YELY_SESSION_COOKIE)?.value === "1";
  const roleCookie = request.cookies.get(YELY_ROLE_COOKIE)?.value;
  const role = isValidAppRole(roleCookie) ? roleCookie : undefined;

  if (isPrivateRoute(pathname)) {
    if (!hasSession) {
      const loginUrl = new URL("/login", request.url);
      const nextPath = `${pathname}${search}`;
      loginUrl.searchParams.set("next", nextPath);
      return NextResponse.redirect(loginUrl);
    }

    if (!role) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!isRoleAllowedForPath(pathname, role)) {
      const redirectPath = getPostLoginRedirectPath(role);
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  if (isAuthRoute(pathname) && hasSession) {
    const redirectPath = getPostLoginRedirectPath(role);
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/organisation-dashboard/:path*",
    "/station-dashboard/:path*",
    "/login",
    "/register",
    "/organisation",
  ],
};
