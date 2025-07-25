import { Task } from "@/models/task";
import TaskService from "@/services/task/task-service";
import { queryOptions } from "@tanstack/react-query";
import { MutationVariables, mutationOptions } from "../utils";

const service = new TaskService();

export const getTaskBaseQueryKey = () => ["tasks"];

export const getTasksOptions = () =>
  queryOptions({
    queryKey: [...getTaskBaseQueryKey(), "list"],
    queryFn: () => service.getTasks(),
  });

export const getTaskByIdOptions = (id: number) =>
  queryOptions({
    queryKey: [...getTaskBaseQueryKey(), "detail", id],
    queryFn: () => service.getTaskById(id),
    enabled: !!id,
  });

export const getTasksByUserOptions = (userId: string) =>
  queryOptions({
    queryKey: [...getTaskBaseQueryKey(), "user", userId],
    queryFn: () => service.getTasksByUser(userId),
    enabled: !!userId,
  });

export const createTaskOptions = () =>
  mutationOptions({
    mutationKey: [...getTaskBaseQueryKey(), "create"],
    mutationFn: ({ payload }: MutationVariables<void, Task>) =>
      service.createTask(payload),
  });

export interface APIUpdateTaskPayload {
  id: string;
  payload: Task;
}

export const updateTaskOptions = () =>
  mutationOptions({
    mutationKey: [...getTaskBaseQueryKey(), "update"],
    mutationFn: ({
      payload,
    }: MutationVariables<Task | undefined, APIUpdateTaskPayload>) =>
      service.updateTask(payload.id, payload.payload),
  });

export interface APIDeleteTaskPayload {
  id: string;
}

export const deleteTaskOptions = () =>
  mutationOptions({
    mutationKey: [...getTaskBaseQueryKey(), "delete"],
    mutationFn: ({ payload }: MutationVariables<void, APIDeleteTaskPayload>) =>
      service.deleteTask(payload.id),
  });

export interface APIAssignTaskPayload {
  taskId: string;
  userId: string;
}

export const assignTaskToUserOptions = () =>
  mutationOptions({
    mutationKey: [...getTaskBaseQueryKey(), "assign"],
    mutationFn: ({ payload }: MutationVariables<void, APIAssignTaskPayload>) =>
      service.assignTaskToUser(payload.taskId, payload.userId),
  });
