import { createContext } from "use-context-selector";

type Props = {
  taskDrawerOpen: boolean;
  setTaskDrawerOpen: (open: boolean) => void;
  userDrawerOpen: boolean;
  setUserDrawerOpen: (open: boolean) => void;
};

export const CreateEntityDrawerContext = createContext({} as Props);
