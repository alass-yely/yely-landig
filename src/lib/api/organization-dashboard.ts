import { apiRequest } from "@/lib/api/client";
import type { ApiSuccessResponse } from "@/types/api";
import type {
  CreateOrganizationManagerPayload,
  OrganizationDashboardOverview,
  OrganizationDriverListItem,
  OrganizationDriversParams,
  OrganizationManagerListItem,
  OrganizationProfile,
  OrganizationStaffParams,
  UpdateOrganizationProfilePayload,
} from "@/types/organization";

type AuthHeaders = {
  Authorization: string;
};

function withAuth(accessToken: string): AuthHeaders {
  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function getOrganizationDashboardOverview(accessToken: string) {
  return apiRequest<ApiSuccessResponse<OrganizationDashboardOverview>>(
    "/organizations/me/dashboard/overview",
    {
      method: "GET",
      headers: withAuth(accessToken),
    },
  );
}

export async function getOrganizationDashboardDrivers(
  accessToken: string,
  params: OrganizationDriversParams = {},
) {
  return apiRequest<ApiSuccessResponse<OrganizationDriverListItem[]>>(
    "/organizations/me/dashboard/drivers",
    {
      method: "GET",
      headers: withAuth(accessToken),
      query: {
        page: params.page,
        pageSize: params.pageSize,
      },
    },
  );
}

export async function getOrganizationDashboardStaff(
  accessToken: string,
  params: OrganizationStaffParams = {},
) {
  return apiRequest<ApiSuccessResponse<OrganizationManagerListItem[]>>(
    "/organizations/me/dashboard/staff",
    {
      method: "GET",
      headers: withAuth(accessToken),
      query: {
        page: params.page,
        pageSize: params.pageSize,
      },
    },
  );
}

export async function getMyOrganizationProfile(accessToken: string) {
  return apiRequest<ApiSuccessResponse<OrganizationProfile>>("/organizations/me/profile", {
    method: "GET",
    headers: withAuth(accessToken),
  });
}

export async function updateMyOrganizationProfile(
  accessToken: string,
  payload: UpdateOrganizationProfilePayload,
) {
  return apiRequest<ApiSuccessResponse<OrganizationProfile>>("/organizations/me/profile", {
    method: "PATCH",
    headers: withAuth(accessToken),
    body: payload,
  });
}

export async function createOrganizationManager(
  accessToken: string,
  payload: CreateOrganizationManagerPayload,
) {
  return apiRequest<ApiSuccessResponse<OrganizationManagerListItem>>(
    "/organizations/me/staff/managers",
    {
      method: "POST",
      headers: withAuth(accessToken),
      body: payload,
    },
  );
}
