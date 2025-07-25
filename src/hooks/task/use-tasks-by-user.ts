import { getTasksByUserOptions } from "@/lib/options/task/task";
import { useQuery } from "@tanstack/react-query";

export const useTasksByUser = (userId: string) => {
  const { data: tasks, isPending: tasksPending } = useQuery(
    getTasksByUserOptions(userId)
  );

  return { tasks, tasksPending };
};
