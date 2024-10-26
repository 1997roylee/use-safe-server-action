import { useState, useCallback } from "react";
import { ApiResponse, createResponse } from "../utils/response";

export type ServerActionState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

export const initialState: ServerActionState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export type ServerFunction<TData> = (...args: any[]) => Promise<TData>;

export interface UseServerActionResult<TData, TError> {
  state: ServerActionState;
  data: TData | null;
  errors: TError | null;
  mutate: (...args: any[]) => void;
  mutateAsync: (...args: any[]) => Promise<ApiResponse<TData, TError>>;
}

export function useSafeServerAction<TData = unknown, TError = Error>(
  serverFn: ServerFunction<TData>,
): UseServerActionResult<TData, TError> {
  const [state, setState] = useState<ServerActionState>(initialState);
  const [errors, setErrors] = useState<TError | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const mutateAsync = useCallback(
    async (...args: any[]): Promise<ApiResponse<TData, TError>> => {
      setState({ ...initialState, isLoading: true });

      try {
        const result = await serverFn(...args);
        setState({ ...initialState, isSuccess: true });
        setData(result);
        return createResponse<TData, TError>(true, result);
      } catch (error) {
        setState({ ...initialState, isError: true });
        setErrors(error as TError);
        return createResponse<TData, TError>(false, error as TError);
      }
    },
    [serverFn],
  );

  const mutate = (...args: any[]) => {
    mutateAsync(...args);
  };

  return {
    state,
    data,
    errors,
    mutate: useCallback(mutate, []),
    mutateAsync: useCallback(mutateAsync, []),
  };
}
