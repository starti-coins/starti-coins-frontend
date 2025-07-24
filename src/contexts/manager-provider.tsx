import { CreateTaskDrawer } from "@/components/@ui/create-task-drawer";
import CreateEntityDrawerProvider from "./create-entity-drawer/provider";
import { CreateUserDrawer } from "@/components/@ui/create-user-drawer";

const ManagerProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CreateEntityDrawerProvider>
      <CreateUserDrawer>
        <CreateTaskDrawer>{children}</CreateTaskDrawer>
      </CreateUserDrawer>
    </CreateEntityDrawerProvider>
  );
};

export default ManagerProvider;
