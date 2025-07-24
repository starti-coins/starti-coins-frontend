import { getAccountOptions } from "@/lib/options/account/account";
import { useQuery } from "@tanstack/react-query";

export const useAccount = () => {
  const { data: account, isPending: accountPending } = useQuery(
    getAccountOptions()
  );

  return { account, accountPending };
};
