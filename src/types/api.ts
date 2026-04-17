export type ApiErrorResponse = {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
};

export type ApiSuccessResponse<T> = {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
};
