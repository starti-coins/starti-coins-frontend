import { createContext } from "use-context-selector";

type Props = {
  taskDrawerOpen: boolean;
  setTaskDrawerOpen: (open: boolean) => void;
};

export const CreateEntityDrawerContext = createContext({} as Props);
