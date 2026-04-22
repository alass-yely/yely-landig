export type OrganizationLeadPayload = {
  organizationName: string;
  contactName: string;
  phone: string;
  email?: string;
  fleetSize?: number;
};

export type OrganizationType = "school" | "company" | "ngo" | "other";

export type OrganizationDashboardOverview = {
  organizationId: string;
  organizationName: string;
  affiliationCode: string;
  totalDrivers?: number;
  totalManagers?: number;
};

export type OrganizationDriverListItem = {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  status?: string;
  affiliatedAt?: string;
  lastActivityAt?: string;
};

export type OrganizationManagerListItem = {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  status?: string;
  createdAt?: string;
};

export type OrganizationProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
};

export type CreateOrganizationManagerPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
};

export type UpdateOrganizationProfilePayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
};

export type OrganizationDriversParams = {
  page?: number;
  pageSize?: number;
};

export type OrganizationStaffParams = {
  page?: number;
  pageSize?: number;
};
