import {
  getAccountOptions,
  logoutOptions,
} from "@/lib/options/account/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { notification } from "../use-notification";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: logout, isPending: logoutPending } = useMutation(
    logoutOptions()
  );

  const handleLogout = useCallback(
    () =>
      logout(undefined, {
        onSuccess: () => {
          queryClient.setQueryData(
            [...getAccountOptions().queryKey],
            () => null
          );
        },
        onError: (error) => {
          notification.formattedError(error);
        },
      }),
    [logout, queryClient]
  );

  return { logout: handleLogout, logoutPending };
};
