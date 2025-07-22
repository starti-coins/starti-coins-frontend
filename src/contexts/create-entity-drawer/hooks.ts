import { CreateEntityDrawerContext } from ".";
import { useContextSelector } from "use-context-selector";

export function useCreateEntityDrawer() {
  return useContextSelector(CreateEntityDrawerContext, (context) => context);
}
