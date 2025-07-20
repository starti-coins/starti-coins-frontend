import { Coins, ListChecks, ListTodo } from "lucide-react";
import Statistics from "../../shared/statistics";
import { IconClockCheck } from "@tabler/icons-react";

export function SectionCards() {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-between gap-4 lg:gap-12">
      <Statistics.Item
        title="Moedas"
        statistic={10}
        icon={<Coins className="text-coin" />}
      />
      <Statistics.Item
        title="Horas trabalhadas"
        statistic={10}
        icon={<IconClockCheck />}
      />
      <Statistics.Item
        title="Tarefas atribuídas"
        statistic={10}
        icon={<ListTodo />}
      />
      <Statistics.Item
        title="Tarefas concluídas"
        statistic={10}
        icon={<ListChecks />}
      />
    </div>
  );
}
