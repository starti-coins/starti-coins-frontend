import { registerOptions } from "@/lib/options/account/account";
import { MutationCallbackOptions } from "@/lib/options/utils";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { notification } from "../use-notification";
import { Account } from "@/models/account";

export const useRegisterAccount = (options?: MutationCallbackOptions) => {
  const { mutateAsync: register, isPending: registerPending } = useMutation(
    registerOptions()
  );

  const handleRegister = useCallback(
    (payload: Partial<Account>) =>
      register(
        {
          payload,
        },
        {
          onSuccess: () => {
            options?.onCompleted?.();
            notification.success("Usuário registrado com sucesso!");
          },
          onError: (error) => {
            options?.onError?.(error);
            notification.formattedError(error);
          },
        }
      ),
    [register, options]
  );

  return { register: handleRegister, registerPending };
};
