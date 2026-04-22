export function getPostLoginRedirectPath(role?: string) {
  if (!role) return "/";

  if (role === "DRIVER") return "/chauffeur";
  if (role === "ORG_OWNER" || role === "ORG_MANAGER") return "/organisation-dashboard";
  if (role === "STATION_OWNER" || role === "STATION_MANAGER" || role === "CASHIER") {
    return "/station-dashboard";
  }
  if (role === "YELY_ADMIN") return "/admin";

  return "/";
}
