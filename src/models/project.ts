export interface Project {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    status: ProjectStatus;
    tasksId: number[];
}

export type ProjectStatus = 'in_progress' | 'completed';

// В завданні не вказано, що потрібно реалізовувати можливість створення нових колонок
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

