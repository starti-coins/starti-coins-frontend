import PrivateProvider from "@/contexts/private-provider";

export default function PrivateLayout({
  collaborator,
  manager,
}: Readonly<{
  collaborator: React.ReactNode;
  manager: React.ReactNode;
}>) {
  const isManager = false;

  return (
    <PrivateProvider>{isManager ? manager : collaborator}</PrivateProvider>
  );
}
