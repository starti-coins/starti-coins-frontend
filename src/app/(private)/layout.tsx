"use client";

import { Spinner } from "@/components/@ui/spinner";
import PrivateProvider from "@/contexts/private-provider";
import { useAccount } from "@/hooks/account/use-account";
import { isManagerUser } from "@/utils/manager";

export default function PrivateLayout({
  collaborator,
  manager,
}: Readonly<{
  collaborator: React.ReactNode;
  manager: React.ReactNode;
}>) {
  const { account, accountPending } = useAccount();
  const isManager = isManagerUser({ account });

  if (accountPending) {
    return <Spinner />;
  }

  return (
    <PrivateProvider>{isManager ? manager : collaborator}</PrivateProvider>
  );
}
