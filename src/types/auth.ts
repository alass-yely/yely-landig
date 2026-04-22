import type { ApiSuccessResponse } from "@/types/api";

export type LoginPayload = {
  phone: string;
  pin: string;
};

export type RegisterDriverPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  pin: string;
  referralCode?: string;
};

export type RegisterOrganizationOwnerPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  pin: string;
  organizationName: string;
  rccm: string;
  vehicleCount?: number;
};

export type AuthUser = {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  qrCodeToken?: string | null;
  referralCode?: string | null;
};

export type DriverAuthUser = AuthUser & {
  qrCodeToken: string;
  referralCode: string;
};

export type AuthOrganization = {
  id: string;
  name: string;
  rccm: string;
  affiliationCode?: string;
  vehicleCount?: number;
};

export type AuthSession<TUser extends AuthUser = AuthUser> = {
  accessToken: string;
  refreshToken: string;
  user: TUser;
};

export type RegisterOrganizationOwnerSession = AuthSession & {
  organization: AuthOrganization;
};

export type RegisterDriverResponse = ApiSuccessResponse<AuthSession<DriverAuthUser>>;
export type LoginResponse = ApiSuccessResponse<AuthSession>;
export type RegisterOrganizationOwnerResponse = ApiSuccessResponse<RegisterOrganizationOwnerSession>;

export type ReferralPreviewDriver = {
  id?: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

export type AffiliationPreviewOrganization = {
  id?: string;
  name: string;
};

export type ReferralPreviewResponse = ApiSuccessResponse<
  | {
      driver: ReferralPreviewDriver;
    }
  | ReferralPreviewDriver
>;

export type AffiliationPreviewResponse = ApiSuccessResponse<
  | {
      organization: AffiliationPreviewOrganization;
    }
  | AffiliationPreviewOrganization
>;
