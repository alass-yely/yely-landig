import { env } from "@/lib/config/env";
import type { ApiErrorResponse } from "@/types/api";

export class ApiClientError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.data = data;
  }
}

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  query?: QueryParams;
};

function withQuery(path: string, query?: QueryParams): string {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  if (!query) return normalizedPath;

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    searchParams.set(key, String(value));
  }

  const queryString = searchParams.toString();
  return queryString ? `${normalizedPath}?${queryString}` : normalizedPath;
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  if (!env.apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
  }

  const { body, headers, query, ...rest } = options;
  const url = new URL(
    withQuery(path, query),
    normalizeBaseUrl(env.apiBaseUrl),
  ).toString();

  const response = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorPayload: ApiErrorResponse | undefined;

    try {
      errorPayload = (await response.json()) as ApiErrorResponse;
    } catch {
      errorPayload = undefined;
    }

    const message = Array.isArray(errorPayload?.message)
      ? errorPayload?.message.join(" ")
      : errorPayload?.message ?? "API request failed.";

    throw new ApiClientError(message, response.status, errorPayload);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
