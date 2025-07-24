import {
  APIUpdateAccountPayload,
  getAccountOptions,
  updateAccountOptions,
} from "@/lib/options/account/account";
import { MutationCallbackOptions } from "@/lib/options/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { notification } from "../use-notification";

export const useUpdateAccount = (options?: MutationCallbackOptions) => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateAccount, isPending: updateAccountPending } =
    useMutation(updateAccountOptions());

  const handleUpdateAccount = useCallback(
    (payload: APIUpdateAccountPayload) =>
      updateAccount(
        {
          payload,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getAccountOptions().queryKey,
            });
            notification.success("Conta atualizada!", {
              duration: 1000,
            });
            options?.onCompleted?.();
          },
          onError: (error) => {
            options?.onError?.(error);
            notification.formattedError(error);
          },
        }
      ),
    [updateAccount, queryClient, options]
  );

  return { updateAccount: handleUpdateAccount, updateAccountPending };
};
