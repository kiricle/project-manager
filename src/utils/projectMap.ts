import type { PrintTask, Project, ProjectStatus, Task } from "@/models/project"

export const projectMap: Record<keyof Omit<Project, 'description'>, string> = {
    'id': 'ID',
    'name': 'Назва',
    'tasksId': 'Завдання',
    'status': 'Статус',
    'createdAt': 'Дата створення',
}

export const statusMap: Record<ProjectStatus, string> = {
    'completed': 'Завершено',
    'in_progress': 'В процесі',
}

export const tasksMap: Record<keyof PrintTask, string> = {
    id: 'ID',
    name: 'Назва завдання',
    assigneeName: 'Виконавець',
    completeTo: 'Виконати до',
}