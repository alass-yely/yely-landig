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
export const SESSION_CHANGED_EVENT = "yely-session-changed";

type StoredSessionPayload = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
  organization?: AuthOrganization | null;
};

type SessionSnapshot = {
  accessToken: string | null;
  user: AuthUser | null;
  organization: AuthOrganization | null;
};

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function notifySessionChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(SESSION_CHANGED_EVENT));
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

export function getStoredSessionUser(): AuthUser | null {
  return getStoredUser();
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

export function getSessionSnapshot(): SessionSnapshot {
  return {
    accessToken: getAccessToken(),
    user: getStoredUser(),
    organization: getStoredOrganization(),
  };
}

export function isAuthenticated() {
  return Boolean(getAccessToken() && getStoredUser());
}

export function setStoredSession(payload: StoredSessionPayload) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, payload.refreshToken);
  window.localStorage.setItem(USER_KEY, JSON.stringify(payload.user));

  if (payload.organization) {
    window.localStorage.setItem(ORGANIZATION_KEY, JSON.stringify(payload.organization));
  } else {
    window.localStorage.removeItem(ORGANIZATION_KEY);
  }

  setSessionCookies(payload.user.role);
  notifySessionChanged();
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(ORGANIZATION_KEY);
  clearSessionCookies();
  notifySessionChanged();
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
