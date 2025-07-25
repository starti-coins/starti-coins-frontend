import {
  getAccountOptions,
  logoutOptions,
} from "@/lib/options/account/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { notification } from "../use-notification";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
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
          router.push("/login");
        },
        onError: (error) => {
          notification.formattedError(error);
        },
      }),
    [logout, router, queryClient]
  );

  return { logout: handleLogout, logoutPending };
};
