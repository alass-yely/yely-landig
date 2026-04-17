import { getStoredUser } from "@/lib/utils/session";

type YelyEvent =
  | "driver_login_success"
  | "driver_register_success"
  | "calculator_used"
  | "referral_copy_click"
  | "whatsapp_share_click"
  | "whatsapp_community_click"
  | "organisation_lead_submit"
  | "affiliation_apply_click"
  | "affiliation_apply_success"
  | "affiliation_apply_error"
  | "qr_token_view";

export function track(event: YelyEvent, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  try {
    const user = getStoredUser();

    console.log("%c[TRACK]", "color: #0f9b58; font-weight: bold;", {
      event,
      userId: user?.id,
      role: user?.role,
      url: window.location.pathname,
      data,
      timestamp: new Date().toISOString(),
    });

    // Plus tard:
    // posthog.capture(...)
    // analytics.track(...)
    // fetch("/api/track", ...)
  } catch {
    // On ne casse jamais l'UX pour du tracking
  }
}