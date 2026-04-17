import { apiRequest } from "@/lib/api/client";
import type { DriverAffiliationResponse, DriverDashboardResponse, DriverReferralSummaryResponse } from "@/types/driver";

export async function getDriverDashboard(accessToken: string) {
  return apiRequest<DriverDashboardResponse>("/drivers/me/dashboard", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function getDriverAffiliation(accessToken: string) {
  return apiRequest<DriverAffiliationResponse>("/drivers/me/affiliation", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function getDriverReferralsSummary(accessToken: string) {
  return apiRequest<DriverReferralSummaryResponse>("/drivers/me/referrals/summary", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
