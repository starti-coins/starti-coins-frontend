import RecentActivityList from "../components/recent-activity-list";
import Page from "@/components/@ui/page";
import { SectionCards } from "../components/section-cards";
import { Suspense } from "react";
import { Spinner } from "@/components/@ui/spinner";

function ManagerDashboard() {
  return (
    <Page>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 md:gap-6">
            <SectionCards />
            <div className="mt-8">
              <h3 className="font-medium text-xl">Atividade recente</h3>

              <Suspense fallback={<Spinner />}>
                <RecentActivityList />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default ManagerDashboard;
