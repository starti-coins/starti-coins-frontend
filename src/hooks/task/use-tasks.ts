import { getTasksOptions } from "@/lib/options/task/task";
import { useQuery } from "@tanstack/react-query";

export const useTasks = () => {
  const { data: tasks, isPending: tasksPending } = useQuery(getTasksOptions());

  return { tasks, tasksPending };
};
