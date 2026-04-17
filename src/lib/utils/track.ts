type TrackPayload = Record<string, unknown>;

export function trackEvent(event: string, payload: TrackPayload = {}) {
  console.log("[track]", event, payload);
}
