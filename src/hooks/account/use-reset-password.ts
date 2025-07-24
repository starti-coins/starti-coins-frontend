import {
  APIResetPasswordPayload,
  resetPasswordOptions,
} from "@/lib/options/account/account";
import { MutationCallbackOptions } from "@/lib/options/utils";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { notification } from "../use-notification";
import { useRouter } from "next/navigation";

export const useResetPassword = (options?: MutationCallbackOptions) => {
  const router = useRouter();
  const { mutateAsync: resetPassword, isPending: resetPasswordPending } =
    useMutation(resetPasswordOptions());

  const handleResetPassword = useCallback(
    (payload: APIResetPasswordPayload) =>
      resetPassword(
        {
          payload,
        },
        {
          onSuccess: () => {
            options?.onCompleted?.();
            notification.success(
              "Senha redefinida com sucesso! Você será redirecionado.",
              {
                onAutoClose: () => {
                  router.push("/login");
                },
              }
            );
          },
          onError: (error) => {
            options?.onError?.(error);
            notification.formattedError(error);
          },
        }
      ),
    [resetPassword, router, options]
  );

  return { resetPassword: handleResetPassword, resetPasswordPending };
};
