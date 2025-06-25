import { SidebarInset, SidebarProvider } from "@/components/@ui/sidebar";
import { SectionCards } from "./components/section-cards";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import RecentActivityList from "./components/recent-activity-list";
import { Suspense } from "react";
import { Spinner } from "@/components/@ui/spinner";

function ManagerDashboard() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
      defaultOpen={false}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 mt-8 lg:px-6">
                <h3 className="font-medium text-xl">Atividade recente</h3>

                <Suspense fallback={<Spinner />}>
                  <RecentActivityList />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ManagerDashboard;
