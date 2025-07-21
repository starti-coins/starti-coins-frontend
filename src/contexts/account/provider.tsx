"use client";

import { AccountContext } from ".";
import { Account } from "@/models/account";
import { PropsWithChildren, useMemo, useState } from "react";

const AccountProvider = ({ children }: PropsWithChildren) => {
  const [account] = useState<Account | undefined>({
    name: "Maria Silva Santos",
    email: "maria.santos@universidade.edu.br",
    registration: "2024001234",
    period: "3",
    cpf: "10970006489",
    rg: "12.345.678-9",
  } satisfies Account);

  const values = useMemo(() => ({ account }), [account]);

  return (
    <AccountContext.Provider value={values}>{children}</AccountContext.Provider>
  );
};

export default AccountProvider;
