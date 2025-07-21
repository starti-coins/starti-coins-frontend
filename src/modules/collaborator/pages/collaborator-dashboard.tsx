"use client";

import Page from "@/components/@ui/page";
import { SectionCards } from "../components/section-cards";
import { Suspense } from "react";
import { Spinner } from "@/components/@ui/spinner";
import { TaskTable } from "../../shared/task-table/data-table";

function CollaboratorDashboard() {
  return (
    <Page>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 md:gap-6">
            <SectionCards />
            <div className="mt-4">
              <Suspense fallback={<Spinner />}>
                <TaskTable title="Tarefas a vencer" data={[]} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default CollaboratorDashboard;
