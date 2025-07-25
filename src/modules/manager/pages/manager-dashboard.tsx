import Page from "@/components/@ui/page";
import { SectionCards } from "../components/section-cards";
import { Suspense } from "react";
import { Spinner } from "@/components/@ui/spinner";
import { TaskTable } from "@/modules/shared/task-table/data-table";
import { Task } from "@/models/task";

const data = {
  id_tarefa: 1,
  titulo: "Tarefa 1",
  descricao: "Descrição da tarefa 1",
  status_tarefa: false,
  id_projeto: 1,
  dificuldade: 3,
  data_limite: new Date(),
  data_atribuicao: new Date(),
  quantidade_horas: 2,
  quantidade_moedas: 100,
  id_responsavel: 1,
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
