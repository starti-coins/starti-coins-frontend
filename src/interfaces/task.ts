import { Task } from "@/models/task";

interface ITask {
  getTasks(): Promise<Task[]>;
  getTaskById(id: number): Promise<Task | undefined>;
  createTask(task: Task): Promise<Task>;
  updateTask(id: string, task: Task): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;
  assignTaskToUser(taskId: string, userId: string): Promise<boolean>;
  getTasksByUser(userId: string): Promise<Task[]>;
}

export default ITask;
