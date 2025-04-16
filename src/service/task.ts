import { client } from "@/api/client";
import type { Task } from "@/models/project";

export class TaskService {
    static async getTasks() {
        const response = await client.get<Task[]>('/tasks')

        return response.data;
    }

    static async createTask(task: Task) {
        const response = await client.post<Task>('/tasks', task)

        return response.data;
    }

    static async updateTasks(tasks: Task[]) {
        const response = await client.put<Task[]>('/tasks', tasks)

        return response.data;
    }
}