"use client";

import { Spinner } from "@/components/@ui/spinner";
import PrivateProvider from "@/contexts/private-provider";
import { useAccount } from "@/hooks/account/use-account";
import { Account } from "@/models/account";

export default function PrivateLayout({
  collaborator,
  manager,
}: Readonly<{
  collaborator: React.ReactNode;
  manager: React.ReactNode;
}>) {
  const { account, accountPending } = useAccount();

  const managerRoles: Account["cargo"][] = ["GESTOR_RH", "TECH_LEAD"];
  const isManager = managerRoles.includes(account?.cargo || "COLABORADOR");

  if (accountPending) {
    return <Spinner />;
  }

  return (
    <PrivateProvider>{isManager ? manager : collaborator}</PrivateProvider>
  );
}
