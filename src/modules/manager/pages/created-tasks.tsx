import Page from "@/components/@ui/page";
import { Spinner } from "@/components/@ui/spinner";
import { Suspense } from "react";
import { TaskTable } from "../../shared/task-table/data-table";
import { Task } from "@/models/task";

const data = [
  {
    id_tarefa: 1,
    titulo: "Tarefa 1",
    descricao: "Descrição da tarefa 1",
    status_tarefa: true,
    id_projeto: 1,
    dificuldade: 3,
    data_limite: new Date(),
    data_atribuicao: new Date(),
    id_responsavel: 1,
    quantidade_horas: 2,
    quantidade_moedas: 100,
  },
  {
    id_tarefa: 2,
    titulo: "Tarefa 2",
    descricao: "Descrição da tarefa 2",
    status_tarefa: true,
    id_projeto: 1,
    dificuldade: 3,
    data_limite: new Date(),
    data_atribuicao: new Date(),
    id_responsavel: 1,
    quantidade_horas: 2,
    quantidade_moedas: 100,
  },
  {
    id_tarefa: 3,
    titulo: "Tarefa 3",
    descricao: "Descrição da tarefa 3",
    status_tarefa: true,
    id_projeto: 1,
    dificuldade: 3,
    data_limite: new Date(),
    data_atribuicao: new Date(),
    id_responsavel: 1,
    quantidade_horas: 2,
    quantidade_moedas: 100,
  },
] satisfies Task[];

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
          <TaskTable data={data} />
        </Suspense>
      </div>
    </Page>
  );
}

export default CreatedTasks;
