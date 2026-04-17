"use client";

import type { AuthUser } from "@/types/auth";

const ACCESS_TOKEN_KEY = "yely_access_token";
const REFRESH_TOKEN_KEY = "yely_refresh_token";
const USER_KEY = "yely_user";

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

export function isAuthenticated() {
  return Boolean(getAccessToken() && getStoredUser());
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

export function getDefaultRedirectPathByRole(role?: string) {
  if (!role) return "/";
  if (role === "DRIVER") return "/chauffeur";
  if (role === "CASHIER" || role === "STATION_MANAGER") return "/organisation";
  if (role === "YELY_ADMIN") return "/organisation";
  return "/";
}
