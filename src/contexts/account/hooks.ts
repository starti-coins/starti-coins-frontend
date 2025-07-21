import { AccountContext } from ".";
import { useContextSelector } from "use-context-selector";

export function useAccount() {
  return useContextSelector(AccountContext, (context) => context.account);
}
