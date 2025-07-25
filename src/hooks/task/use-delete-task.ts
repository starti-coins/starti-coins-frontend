import {
  APIDeleteTaskPayload,
  deleteTaskOptions,
  getTasksOptions,
} from "@/lib/options/task/task";
import { MutationCallbackOptions } from "@/lib/options/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { notification } from "../use-notification";

export const useDeleteTask = (options?: MutationCallbackOptions) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteTask, isPending: deleteTaskPending } = useMutation(
    deleteTaskOptions()
  );

  const handleDeleteTask = useCallback(
    (payload: APIDeleteTaskPayload) =>
      deleteTask(
        {
          payload,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getTasksOptions().queryKey,
            });
            notification.success("Tarefa excluída com sucesso!");
            options?.onCompleted?.();
          },
          onError: (error) => {
            options?.onError?.(error);
            notification.formattedError(error);
          },
        }
      ),
    [deleteTask, queryClient, options]
  );

  return { deleteTask: handleDeleteTask, deleteTaskPending };
};
