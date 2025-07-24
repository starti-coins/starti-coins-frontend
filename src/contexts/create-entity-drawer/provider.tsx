"use client";

import { parseAsBoolean, useQueryState } from "nuqs";
import { CreateEntityDrawerContext } from ".";
import { PropsWithChildren, useMemo } from "react";

const CreateEntityDrawerProvider = ({ children }: PropsWithChildren) => {
  // const [taskDrawerOpen, setTaskDrawerOpen] = useState(false);
  const [taskDrawerOpen, setTaskDrawerOpen] = useQueryState(
    "taskDrawerOpen",
    parseAsBoolean.withDefault(false)
  );
  const [userDrawerOpen, setUserDrawerOpen] = useQueryState(
    "userDrawerOpen",
    parseAsBoolean.withDefault(false)
  );

  const values = useMemo(
    () => ({
      taskDrawerOpen,
      setTaskDrawerOpen,
      userDrawerOpen,
      setUserDrawerOpen,
    }),
    [taskDrawerOpen, setTaskDrawerOpen, userDrawerOpen, setUserDrawerOpen]
  );

  return (
    <CreateEntityDrawerContext.Provider value={values}>
      {children}
    </CreateEntityDrawerContext.Provider>
  );
};

export default CreateEntityDrawerProvider;
