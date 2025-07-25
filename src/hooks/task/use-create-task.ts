import { createTaskOptions, getTasksOptions } from "@/lib/options/task/task";
import { MutationCallbackOptions } from "@/lib/options/utils";
import { Task } from "@/models/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { notification } from "../use-notification";

export const useCreateTask = (options?: MutationCallbackOptions) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createTask, isPending: createTaskPending } = useMutation(
    createTaskOptions()
  );

  const handleCreateTask = useCallback(
    (payload: Task) =>
      createTask(
        {
          payload,
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: getTasksOptions().queryKey,
            });
            notification.success("Tarefa criada com sucesso!");
            options?.onCompleted?.(data);
          },
          onError: (error) => {
            options?.onError?.(error);
            notification.formattedError(error);
          },
        }
      ),
    [createTask, options, queryClient]
  );

  return { createTask: handleCreateTask, createTaskPending };
};
