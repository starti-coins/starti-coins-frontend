import { CreateTaskDrawer } from "@/components/@ui/create-task-drawer";
import CreateEntityDrawerProvider from "./create-entity-drawer/provider";

const ManagerProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CreateEntityDrawerProvider>
      <CreateTaskDrawer>{children}</CreateTaskDrawer>
    </CreateEntityDrawerProvider>
  );
};

export default ManagerProvider;
