export default function PrivateLayout({
  collaborator,
  manager,
}: Readonly<{
  collaborator: React.ReactNode;
  manager: React.ReactNode;
}>) {
  const isManager = false;

  return <div>{isManager ? manager : collaborator}</div>;
}
