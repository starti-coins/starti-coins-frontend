import Page from "@/components/@ui/page";
import { Spinner } from "@/components/@ui/spinner";
import { Suspense } from "react";
import { TaskTable } from "../../shared/task-table/data-table";

function CollaboratorTasks() {
  return (
    <Page>
      <h3 className="text-2xl font-medium">Minhas tarefas</h3>
      <p className="text-muted-foreground mb-4 mt-1">
        Esta é a lista de tarefas atribuídas a você! Organize-as da forma que
        preferir.
      </p>
      <div className="my-2">
        <Suspense fallback={<Spinner />}>
          <TaskTable data={[]} />
        </Suspense>
      </div>
    </Page>
  );
}

export default CollaboratorTasks;
