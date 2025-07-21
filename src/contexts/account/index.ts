import { Account } from "@/models/account";
import { createContext } from "use-context-selector";

type Props = {
  account: Account | undefined;
};

export const AccountContext = createContext({} as Props);
