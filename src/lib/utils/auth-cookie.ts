export const YELY_SESSION_COOKIE = "yely_session";
export const YELY_ROLE_COOKIE = "yely_role";

export const SESSION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24; // 1 day

export type AppRole =
  | "DRIVER"
  | "ORG_OWNER"
  | "ORG_MANAGER"
  | "STATION_OWNER"
  | "STATION_MANAGER"
  | "CASHIER"
  | "YELY_ADMIN";

const VALID_APP_ROLES: ReadonlySet<AppRole> = new Set([
  "DRIVER",
  "ORG_OWNER",
  "ORG_MANAGER",
  "STATION_OWNER",
  "STATION_MANAGER",
  "CASHIER",
  "YELY_ADMIN",
]);

export function isValidAppRole(value: string | undefined | null): value is AppRole {
  if (!value) return false;
  return VALID_APP_ROLES.has(value as AppRole);
}

function shouldUseSecureCookie() {
  if (typeof window === "undefined") {
    return process.env.NODE_ENV === "production";
  }

  return window.location.protocol === "https:";
}

export function getClientCookieOptions(maxAgeSeconds = SESSION_COOKIE_MAX_AGE_SECONDS) {
  const base = [`Path=/`, `SameSite=Lax`, `Max-Age=${maxAgeSeconds}`];
  if (shouldUseSecureCookie()) {
    base.push("Secure");
  }
  return base.join("; ");
}

export function getDeleteCookieOptions() {
  return getClientCookieOptions(0);
}
