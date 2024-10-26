export type SuccessResponse<TData> = {
  ok: true;
  data: TData | null;
};

export type ErrorResponse<TError> = {
  ok: false;
  data: TError | null;
};

export type ApiResponse<TData, TError> =
  | SuccessResponse<TData>
  | ErrorResponse<TError>;

export function createResponse<TData = unknown, TError = unknown>(
  ok: boolean,
  data: TData | TError | null,
): ApiResponse<TData, TError> {
  return {
    ok,
    data,
  } as ApiResponse<TData, TError>;
}
