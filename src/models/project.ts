import { z } from "zod";

export interface Project {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    status: ProjectStatus;
    tasksId: number[];
}

export type ProjectStatus = 'in_progress' | 'completed';

export interface ProjectCreate {
    name: string;
    description: string;
}

export const ProjectCreateSchema = z.object({
    name: z.string().min(1, 'Назва проекту обов\'язкова'),
    description: z.string()
})

export interface Task {
    id: number;
    name: string;
    assigneeName: string;
    status: TaskStatus;
    projectId: number;
    order: number;
    completeTo: string;
}

export interface PrintTask extends Omit<Task, 'status' | 'order' | 'projectId'> {

}

export type TaskStatus = "to_do" | "in_progress" | "done";

