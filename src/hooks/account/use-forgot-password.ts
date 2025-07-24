import {
  APIForgotPasswordPayload,
  forgotPasswordOptions,
} from "@/lib/options/account/account";
import { MutationCallbackOptions } from "@/lib/options/utils";
import { useMutation } from "@tanstack/react-query";
import { notification } from "../use-notification";
import { useCallback } from "react";

export const useForgotPassword = (options?: MutationCallbackOptions) => {
  const { mutateAsync: forgotPassword, isPending: forgotPasswordPending } =
    useMutation(forgotPasswordOptions());

  const handleForgotPassword = useCallback(
    (payload: APIForgotPasswordPayload) =>
      forgotPassword(
        {
          payload,
        },
        {
          onSuccess: (data) => {
            notification.success(
              "Um e-mail foi enviado para redefinir sua senha. Verifique sua caixa de entrada!"
            );
            options?.onCompleted?.(data);
          },
          onError: (error) => {
            options?.onError?.(error);
            notification.formattedError(error);
          },
        }
      ),
    [forgotPassword, options]
  );

  return { forgotPassword: handleForgotPassword, forgotPasswordPending };
};
