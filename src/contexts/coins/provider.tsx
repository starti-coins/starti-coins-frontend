"use client";

import { CoinsContext } from ".";
import { PropsWithChildren, useMemo, useState } from "react";

const CoinsProvider = ({ children }: PropsWithChildren) => {
  const [coins] = useState(127);

  const values = useMemo(() => ({ coins }), [coins]);

  return (
    <CoinsContext.Provider value={values}>{children}</CoinsContext.Provider>
  );
};

export default CoinsProvider;
