import { apiRequest } from "@/lib/api/client";

export type ApplyAffiliationResponse = {
  success: boolean;
  data: unknown;
};

export async function applyAffiliation(accessToken: string, code: string) {
  return apiRequest<ApplyAffiliationResponse>("/network/affiliations/apply", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: { code },
  });
}
