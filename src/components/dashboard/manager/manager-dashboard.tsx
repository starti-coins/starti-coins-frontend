import { SectionCards } from "./components/section-cards";
import RecentActivityList from "./components/recent-activity-list";
import { Suspense } from "react";
import { Spinner } from "@/components/@ui/spinner";

function ManagerDashboard() {
  return (
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
  );
}

export default ManagerDashboard;
