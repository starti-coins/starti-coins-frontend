import {
  APIAssignTaskPayload,
  assignTaskToUserOptions,
  getTasksOptions,
} from "@/lib/options/task/task";
import { MutationCallbackOptions } from "@/lib/options/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { notification } from "../use-notification";

export const useAssignTask = (options?: MutationCallbackOptions) => {
  const queryClient = useQueryClient();
  const { mutateAsync: assignTask, isPending: assignTaskPending } = useMutation(
    assignTaskToUserOptions()
  );

  const handleAssignTask = useCallback(
    (payload: APIAssignTaskPayload) =>
      assignTask(
        {
          payload,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getTasksOptions().queryKey,
            });
            notification.success("Tarefa atribuída com sucesso!");
            options?.onCompleted?.();
          },
          onError: (error) => {
            options?.onError?.(error);
            notification.formattedError(error);
          },
        }
      ),
    [assignTask, queryClient, options]
  );

  return { assignTask: handleAssignTask, assignTaskPending };
};
