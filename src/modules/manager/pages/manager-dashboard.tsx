import RecentActivityList from "../components/recent-activity-list";
import Page from "@/components/@ui/page";
import { SectionCards } from "../components/section-cards";
import { Suspense } from "react";
import { Spinner } from "@/components/@ui/spinner";
import { TaskTable } from "@/modules/shared/task-table/data-table";
import { Task } from "@/models/task";

const data = {
  id: 1,
  title: "Tarefa 1",
  description: "Descrição da tarefa 1",
  status: "Done",
  responsible_id: "Eddie Lake",
  level: 3,
  due_date: new Date(),
  assignment_date: new Date(),
  completion_date: new Date(),
  hours: 2,
  coins: 100,
} satisfies Task;

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
                {/* <RecentActivityList /> */}
                <TaskTable data={[data]} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default ManagerDashboard;
