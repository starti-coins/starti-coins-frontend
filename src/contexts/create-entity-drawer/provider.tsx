"use client";

import { CreateEntityDrawerContext } from ".";
import { PropsWithChildren, useMemo, useState } from "react";

const CreateEntityDrawerProvider = ({ children }: PropsWithChildren) => {
  const [taskDrawerOpen, setTaskDrawerOpen] = useState(false);

  const values = useMemo(
    () => ({ taskDrawerOpen, setTaskDrawerOpen }),
    [taskDrawerOpen]
  );

  return (
    <CreateEntityDrawerContext.Provider value={values}>
      {children}
    </CreateEntityDrawerContext.Provider>
  );
};

export default CreateEntityDrawerProvider;
