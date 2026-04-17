import { apiRequest } from "@/lib/api/client";

type OrganizationLeadPayload = {
  organizationName: string;
  contactName: string;
  phone: string;
  email?: string;
  fleetSize?: number;
};

type OrganizationLeadResponse = {
  success: boolean;
  data: unknown;
};

export async function createOrganizationLead(payload: OrganizationLeadPayload) {
  return apiRequest<OrganizationLeadResponse>("/public/leads/organizations", {
    method: "POST",
    body: payload,
  });
}
