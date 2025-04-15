import { z } from "zod";

export interface Project {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
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

export type ColumnName = "To Do" | "In Progress" | "Done";

export interface Task {
    id: number;
    name: string;
    assigneeName: string;
    columnName: ColumnName;
    order: number;
    status: TaskStatus;
    projectId: number;
}

export type TaskStatus = 'in_progress' | 'completed';

