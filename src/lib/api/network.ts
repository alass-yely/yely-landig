import { apiRequest } from "@/lib/api/client";
import type { AffiliationPreviewResponse } from "@/types/auth";
import type { ApplyAffiliationPayload } from "@/types/network";

export type ApplyAffiliationResponse = {
  success: boolean;
  data: unknown;
};

type PreviewOptions = {
  signal?: AbortSignal;
};

export async function previewAffiliation(code: string, options: PreviewOptions = {}) {
  const safeCode = encodeURIComponent(code);
  return apiRequest<AffiliationPreviewResponse>(`/public/affiliations/${safeCode}`, {
    method: "GET",
    signal: options.signal,
  });
}

export async function applyAffiliation(accessToken: string, affiliationCodeValue: string) {
  const payload: ApplyAffiliationPayload = {
    affiliationCode: affiliationCodeValue,
  };

  return apiRequest<ApplyAffiliationResponse>("/network/affiliations/apply", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: payload,
  });
}
