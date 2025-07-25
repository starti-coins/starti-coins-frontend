import ITask from "@/interfaces/task";
import { Task } from "@/models/task";
import APIClient from "../api/client";

class TaskService implements ITask {
  async getTasks(): Promise<Task[]> {
    const response = await APIClient.get("/tarefas");
    return response.data.tasks;
  }

  async getTaskById(id: number): Promise<Task | undefined> {
    const response = await APIClient.get(`/tarefas/${id}`);
    return response.data.task;
  }

  async createTask(task: Task): Promise<Task> {
    const response = await APIClient.post("/tarefas", task);
    return response.data.task;
  }

  async updateTask(id: string, task: Task): Promise<Task | undefined> {
    const response = await APIClient.put(`/tarefas/${id}`, task);
    return response.data.task;
  }

  async deleteTask(id: string): Promise<boolean> {
    await APIClient.delete(`/tarefas/${id}`);
    return true;
  }

  async assignTaskToUser(taskId: string, userId: string): Promise<boolean> {
    await APIClient.post(`/tarefas/${taskId}/assign`, { userId });
    return true;
  }

  async getTasksByUser(userId: string): Promise<Task[]> {
    const response = await APIClient.get(`/users/${userId}/tarefas`);
    return response.data.tasks;
  }
}

export default TaskService;
