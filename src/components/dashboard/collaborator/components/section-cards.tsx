import { FileBadge, ListChecks, ListTodo, UserLock } from "lucide-react";
import Statistics from "../../shared/statistics";

export function SectionCards() {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-between gap-4 px-6 lg:gap-12">
      <Statistics.Item title="Moedas" statistic={10} icon={<FileBadge />} />
      <Statistics.Item
        title="Horas trabalhadas"
        statistic={10}
        icon={<ListChecks />}
      />
      <Statistics.Item
        title="Tarefas atribuídas"
        statistic={10}
        icon={<ListTodo />}
      />
      <Statistics.Item
        title="Tarefas concluídas"
        statistic={10}
        icon={<UserLock />}
      />
    </div>
  );
}
