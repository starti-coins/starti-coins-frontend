import { CreateEntityDrawerContext } from ".";
import { useContextSelector } from "use-context-selector";

export function useCreateTaskDrawer() {
  return useContextSelector(CreateEntityDrawerContext, (context) => ({
    taskDrawerOpen: context.taskDrawerOpen,
    setTaskDrawerOpen: context.setTaskDrawerOpen,
  }));
}

export function useCreateUserDrawer() {
  return useContextSelector(CreateEntityDrawerContext, (context) => ({
    userDrawerOpen: context.userDrawerOpen,
    setUserDrawerOpen: context.setUserDrawerOpen,
  }));
}
