"use client";

import { useAccount } from "@/contexts/account/hooks";
import Page from "@/components/@ui/page";
import { Spinner } from "@/components/@ui/spinner";
import ProfileForm from "./components/profile-form";

export default function Profile() {
  const userData = useAccount();

  if (!userData) {
    return <Spinner />;
  }

  return (
    <Page>
      <ProfileForm userData={userData} />
    </Page>
  );
}
