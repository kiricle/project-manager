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

export interface TaskCreate {
    name: string;
    assigneeName: string;
    order: number;
    completeTo: string;
    projectId: number;
    status: TaskStatus;
}

export const TaskCreateSchema = z.object({
    name: z.string().min(1, 'Назва задачі обов\'язкова'),
    assigneeName: z.string().min(1, 'Ім\'я виконавця обов\'язкове'),
    order: z.number().min(1, 'Порядок задачі обов\'язковий'),
    completeTo: z.string().min(1, 'Дата виконання обов\'язкова'),
    projectId: z.number().min(1, 'ID проекту обов\'язковий'),
})

export interface PrintTask extends Omit<Task, 'status' | 'order' | 'projectId'> {

}

export type TaskStatus = "to_do" | "in_progress" | "done";

