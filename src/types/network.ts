export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type NetworkState = "idle" | "loading" | "success" | "error";

export type RequestStatus = {
  state: NetworkState;
  message?: string;
};

export type ApplyAffiliationPayload = {
  affiliationCode: string;
};

export type AffiliationApplyResult = {
  success: boolean;
};
