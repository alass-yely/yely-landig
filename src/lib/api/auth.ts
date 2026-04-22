import { apiRequest } from "@/lib/api/client";
import type {
  LoginPayload,
  LoginResponse,
  RegisterDriverPayload,
  RegisterDriverResponse,
  RegisterOrganizationOwnerPayload,
  RegisterOrganizationOwnerResponse,
} from "@/types/auth";

export async function registerDriver(payload: RegisterDriverPayload) {
  return apiRequest<RegisterDriverResponse>("/auth/drivers/register", {
    method: "POST",
    body: payload,
  });
}

export async function registerOrganizationOwner(payload: RegisterOrganizationOwnerPayload) {
  return apiRequest<RegisterOrganizationOwnerResponse>("/auth/organizations/register", {
    method: "POST",
    body: payload,
  });
}

export async function login(payload: LoginPayload) {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });
}
