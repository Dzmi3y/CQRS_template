import { useMutation } from "@tanstack/react-query";
import useAccount from "./useAccount";
import { refresh } from "@api/accountApi";
import { AccountActionTypes } from "@actions/AccountAction";
import { HttpError } from "@mixins/Errors/HttpError";
import accountCache from "@mixins/Cache/accountCache";

type MutationFn<TInput, TOutput> = (input: TInput) => Promise<TOutput>;

export function useRecoverableMutation<TInput, TOutput>(
  mutationFn: MutationFn<TInput, TOutput>,
  options?: {
    onSuccess?: (data: TOutput) => void;
    onError?: (error: any) => void;
  }
) {
  const { account, dispatch } = useAccount();

  const mutation = useMutation<TOutput, any, TInput>({
    mutationFn: async (input: TInput) => {
      try {
        return await mutationFn(input);
      } catch (error: any) {
        console.log("catch", error);
        if (error instanceof HttpError) {
          const status = error.status;
          if (status === 401) {
            try {
              const refreshed = await refresh();
              const newValue = { ...accountCache.get(), authData: refreshed };
              accountCache.set(newValue);
              dispatch({
                type: AccountActionTypes.SIGN_IN,
                payload: refreshed,
              });
              return await mutationFn(input);
            } catch (refreshError) {
              dispatch({ type: AccountActionTypes.SIGN_OUT });
              throw refreshError;
            }
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      }
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return mutation;
}
