export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  landingBaseUrl: process.env.NEXT_PUBLIC_LANDING_BASE_URL ?? "",
  whatsappCommunityUrl: process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL ?? "",
} as const;

export function hasApiBaseUrl() {
  return env.apiBaseUrl.length > 0;
}
