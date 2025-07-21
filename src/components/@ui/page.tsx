import React, { PropsWithChildren } from "react";

function Page({ children }: PropsWithChildren) {
  return <div className="p-4 lg:p-6">{children}</div>;
}

export default Page;
