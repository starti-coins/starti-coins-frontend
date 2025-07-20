import Image from "next/image";
import { FileBadge, ListChecks, ListTodo, User, UserLock } from "lucide-react";
import Statistics from "../../shared/statistics";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-12">
      <Statistics.Container title="Tarefas">
        <Statistics.Item
          title="Atribuídas"
          statistic={50}
          icon={<ListTodo size={28} className="text-slate-600" />}
        />

        <Statistics.Item
          title="Concluídas"
          statistic={50}
          icon={<ListChecks size={28} className="text-slate-600" />}
        />

        <Statistics.Item
          title="Não atribuídas"
          statistic={50}
          icon={
            <Image
              src="/img/icons/not-assigned.svg"
              alt="user active icon"
              width={28}
              height={28}
              className="min-w-[28px] min-h-[28px]"
            />
          }
        />

        <Statistics.Item
          title="Em andamento"
          statistic={50}
          icon={<ListTodo size={28} className="text-slate-600" />}
        />
      </Statistics.Container>

      <Statistics.Container title="Projetos">
        <Statistics.Item
          title="Projetos totais"
          statistic={50}
          icon={<FileBadge size={28} className="text-slate-600" />}
        />

        <Statistics.Item
          title="Membros totais"
          statistic={50}
          icon={<User size={28} className="text-slate-600" />}
        />

        <Statistics.Item
          title="Membros ativos"
          statistic={50}
          icon={
            <Image
              src="/img/icons/user-active.svg"
              alt="user active icon"
              width={28}
              height={28}
              className="min-w-[28px] min-h-[28px]"
            />
          }
        />

        <Statistics.Item
          title="Membros inativos"
          statistic={50}
          icon={<UserLock size={28} className="text-slate-600" />}
        />
      </Statistics.Container>
    </div>
  );
}
