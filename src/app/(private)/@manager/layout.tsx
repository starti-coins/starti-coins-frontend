import ManagerProvider from "@/contexts/manager-provider";
import { SidebarInset, SidebarProvider } from "@/components/@ui/sidebar";
import { AppSidebar } from "@/modules/shared/sidebar";
import { SiteHeader } from "@/modules/manager/components/site-header";
import { sidebarItems } from "@/modules/manager/routes/manager-routes";

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ManagerProvider>
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
    </ManagerProvider>
  );
}
