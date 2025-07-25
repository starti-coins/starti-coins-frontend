import {
  APIUpdateTaskPayload,
  getTasksOptions,
  updateTaskOptions,
} from "@/lib/options/task/task";
import { MutationCallbackOptions } from "@/lib/options/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { notification } from "../use-notification";

export const useUpdateTask = (options?: MutationCallbackOptions) => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateTask, isPending: updateTaskPending } = useMutation(
    updateTaskOptions()
  );

  const handleUpdateTask = useCallback(
    (payload: APIUpdateTaskPayload) =>
      updateTask(
        {
          payload,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getTasksOptions().queryKey,
            });
            notification.success("Tarefa atualizada com sucesso!");
            options?.onCompleted?.();
          },
          onError: (error) => {
            options?.onError?.(error);
            notification.formattedError(error);
          },
        }
      ),
    [updateTask, queryClient, options]
  );

  return { updateTask: handleUpdateTask, updateTaskPending };
};
