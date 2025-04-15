import type { Project, ProjectStatus } from "@/models/project"

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