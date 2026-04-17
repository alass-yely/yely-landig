import { apiRequest } from "@/lib/api/client";
import type { AffiliationPreviewResponse, ReferralPreviewResponse } from "@/types/auth";

type PreviewOptions = {
  signal?: AbortSignal;
};

export async function getReferralPreview(code: string, options: PreviewOptions = {}) {
  const safeCode = encodeURIComponent(code);
  return apiRequest<ReferralPreviewResponse>(`/public/referrals/${safeCode}`, {
    method: "GET",
    signal: options.signal,
  });
}

export async function getAffiliationPreview(code: string, options: PreviewOptions = {}) {
  const safeCode = encodeURIComponent(code);
  return apiRequest<AffiliationPreviewResponse>(`/public/affiliations/${safeCode}`, {
    method: "GET",
    signal: options.signal,
  });
}
