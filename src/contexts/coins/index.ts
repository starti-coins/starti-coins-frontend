import { createContext } from "use-context-selector";

type Props = {
  coins: number;
};

export const CoinsContext = createContext({} as Props);
