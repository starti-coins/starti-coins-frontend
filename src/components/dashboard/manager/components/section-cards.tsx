import { FileBadge, ListChecks, ListTodo, User, UserLock } from "lucide-react";
import Image from "next/image";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-6 lg:grid-cols-2 lg:gap-12">
      <div className="border w-full rounded-xl shadow px-4 py-6 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Tarefas</h1>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="border rounded-lg p-2 flex gap-2 items-center">
            <div className="border-1 rounded-full p-2 flex items-center">
              <ListTodo size={28} className="text-slate-600" />
            </div>
            <div className="px-2 truncate">
              <p className="text-lg font-medium">Atribuídas</p>
              <p>50</p>
            </div>
          </div>

          <div className="border rounded-lg p-2 flex gap-2 items-center">
            <div className="border-1 rounded-full p-2 flex items-center">
              <ListChecks size={28} className="text-slate-600" />
            </div>
            <div className="px-2 truncate">
              <p className="text-lg font-medium">Concluídas</p>
              <p>50</p>
            </div>
          </div>

          <div className="border rounded-lg p-2 flex gap-2 items-center">
            <div className="border-1 rounded-full p-2 flex items-center">
              <Image
                src="/img/icons/not-assigned.svg"
                alt="user acetive icon"
                width={28}
                height={28}
                className="min-w-[28px] min-h-[28px]"
              />
            </div>
            <div className="px-2 truncate">
              <p className="text-lg font-medium">Não atribuídas</p>
              <p>50</p>
            </div>
          </div>

          <div className="border rounded-lg p-2 flex gap-2 items-center">
            <div className="border-1 rounded-full p-2 flex items-center">
              <ListTodo size={28} className="text-slate-600" />
            </div>
            <div className="px-2 truncate">
              <p className="text-lg font-medium">Em andamento</p>
              <p>50</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border w-full rounded-xl shadow px-4 py-6 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Projetos</h1>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="border rounded-lg p-2 flex gap-2 items-center">
            <div className="border-1 rounded-full p-2 flex items-center">
              <FileBadge size={28} className="text-slate-600" />
            </div>
            <div className="px-2 truncate">
              <p className="text-lg font-medium text-wrap">Projetos totais</p>
              <p>50</p>
            </div>
          </div>

          <div className="border rounded-lg p-2 flex gap-2 items-center">
            <div className="border-1 rounded-full p-2 flex items-center">
              <User size={28} className="text-slate-600" />
            </div>
            <div className="px-2 truncate">
              <p className="text-lg font-medium">Membros totais</p>
              <p>50</p>
            </div>
          </div>

          <div className="border rounded-lg p-2 flex gap-2 items-center">
            <div className="border-1 rounded-full p-2 flex items-center justify-center">
              <Image
                src="/img/icons/user-active.svg"
                alt="user acetive icon"
                width={28}
                height={28}
                className="min-w-[28px] min-h-[28px]"
              />
            </div>
            <div className="px-2 truncate">
              <p className="text-lg font-medium">Membros ativos</p>
              <p>50</p>
            </div>
          </div>

          <div className="border rounded-lg p-2 flex gap-2 items-center">
            <div className="border-1 rounded-full p-2 flex items-center">
              <UserLock size={28} className="text-slate-600" />
            </div>
            <div className="px-2 truncate">
              <p className="text-lg font-medium">Membros inativos</p>
              <p>50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
