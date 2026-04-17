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

export type AuthUser = {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  qrCodeToken: string;
  referralCode: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type RegisterDriverResponse = ApiSuccessResponse<AuthSession>;
export type LoginResponse = ApiSuccessResponse<AuthSession>;

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
