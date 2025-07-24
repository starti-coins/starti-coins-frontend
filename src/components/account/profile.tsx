"use client";

import Page from "@/components/@ui/page";
import { Spinner } from "@/components/@ui/spinner";
import ProfileForm from "./components/profile-form";
import { useAccount } from "@/hooks/account/use-account";

export default function Profile() {
  const { account, accountPending } = useAccount();

  if (accountPending) {
    return <Spinner />;
  }

  if (!account) {
    return <div>Account not found</div>;
  }

  return (
    <Page>
      <ProfileForm userData={account} />
    </Page>
  );
}
