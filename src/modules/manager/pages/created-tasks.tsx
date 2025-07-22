import Page from "@/components/@ui/page";
import { Spinner } from "@/components/@ui/spinner";
import { Suspense } from "react";
import { TaskTable } from "../../shared/task-table/data-table";

const data = {
  id: 1,
  title: "Tarefa 1",
  description: "Descrição da tarefa 1",
  status: "Done",
  responsible: "Eddie Lake",
  level: 3,
  date: new Date(),
};

function CreatedTasks() {
  return (
    <Page>
      <h3 className="font-medium text-2xl">Tarefas criadas</h3>
      <p className="text-muted-foreground mb-4 mt-1">
        Esta é a lista de tarefas criadas por você! Organize-as da forma que
        preferir.
      </p>
      <div className="my-2">
        <Suspense fallback={<Spinner />}>
          <TaskTable data={[data]} />
        </Suspense>
      </div>
    </Page>
  );
}

export default CreatedTasks;
