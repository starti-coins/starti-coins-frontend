import { SidebarInset, SidebarProvider } from "@/components/@ui/sidebar";
import { AppSidebar } from "@/components/dashboard/collaborator/components/app-sidebar";
import { SiteHeader } from "@/components/dashboard/collaborator/components/site-header";
import { sidebarItems } from "@/components/dashboard/collaborator/routes/collaborator-routes";

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
      defaultOpen={true}
    >
      <AppSidebar variant="inset" sidebarItems={sidebarItems} />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
