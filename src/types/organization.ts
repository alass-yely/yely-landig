export type OrganizationLeadPayload = {
  organizationName: string;
  contactName: string;
  phone: string;
  email?: string;
  fleetSize?: number;
};

export type OrganizationType = "school" | "company" | "ngo" | "other";
