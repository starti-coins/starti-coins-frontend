import { CoinsContext } from ".";
import { useContextSelector } from "use-context-selector";

export function useCoins() {
  return useContextSelector(CoinsContext, (context) => context.coins);
}
