import {
  APILoginPayload,
  getAccountOptions,
  loginOptions,
} from "@/lib/options/account/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "../use-notification";
import { useCallback } from "react";
import { MutationCallbackOptions } from "@/lib/options/utils";

export const useLogin = (options?: MutationCallbackOptions) => {
  const queryClient = useQueryClient();

  const { mutateAsync: login, isPending: loginPending } = useMutation(
    loginOptions()
  );

  const handleLogin = useCallback(
    (payload: APILoginPayload) =>
      login(
        {
          payload,
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: getAccountOptions().queryKey,
            });
            options?.onCompleted?.(data);
          },
          onError: (error) => {
            options?.onError?.(error);
            notification.warning(
              "Seu email ou senha estão incorretos! Verifique e tente novamente."
            );
          },
        }
      ),
    [login, options, queryClient]
  );

  return { login: handleLogin, loginPending };
};
