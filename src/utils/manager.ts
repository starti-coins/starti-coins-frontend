import { Account } from "@/models/account";

export const isManagerUser = ({
  account,
}: {
  account: Account | undefined;
}) => {
  const managerRoles: Account["cargo"][] = ["GESTOR_RH", "TECH_LEAD"];

  return managerRoles.includes(account?.cargo || "COLABORADOR");
};
