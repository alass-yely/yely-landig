"use client";

import {
  getClientCookieOptions,
  getDeleteCookieOptions,
  isValidAppRole,
  YELY_ROLE_COOKIE,
  YELY_SESSION_COOKIE,
} from "@/lib/utils/auth-cookie";
import type { AuthOrganization, AuthUser } from "@/types/auth";
import { getPostLoginRedirectPath } from "@/lib/utils/auth-redirect";

const ACCESS_TOKEN_KEY = "yely_access_token";
const REFRESH_TOKEN_KEY = "yely_refresh_token";
const USER_KEY = "yely_user";
const ORGANIZATION_KEY = "yely_organization";

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function getStoredOrganization(): AuthOrganization | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(ORGANIZATION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthOrganization;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getAccessToken() && getStoredUser());
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(ORGANIZATION_KEY);
  clearSessionCookies();
}

export function getDefaultRedirectPathByRole(role?: string) {
  return getPostLoginRedirectPath(role);
}

export function setSessionCookies(role?: string) {
  if (typeof window === "undefined") return;
  document.cookie = `${YELY_SESSION_COOKIE}=1; ${getClientCookieOptions()}`;

  if (isValidAppRole(role)) {
    document.cookie = `${YELY_ROLE_COOKIE}=${encodeURIComponent(role)}; ${getClientCookieOptions()}`;
  } else {
    document.cookie = `${YELY_ROLE_COOKIE}=; ${getDeleteCookieOptions()}`;
  }
}

export function clearSessionCookies() {
  if (typeof window === "undefined") return;
  document.cookie = `${YELY_SESSION_COOKIE}=; ${getDeleteCookieOptions()}`;
  document.cookie = `${YELY_ROLE_COOKIE}=; ${getDeleteCookieOptions()}`;
}
