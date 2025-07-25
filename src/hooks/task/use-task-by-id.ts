import { getTaskByIdOptions } from "@/lib/options/task/task";
import { useQuery } from "@tanstack/react-query";

export const useTaskById = (id: number) => {
  const { data: task, isPending: taskPending } = useQuery(
    getTaskByIdOptions(id)
  );

  return { task, taskPending };
};
