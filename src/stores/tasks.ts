import { useFetch } from '@/composables/useFetch'
import type { Task, TaskCreate } from '@/models/project'
import { TaskService } from '@/service/task'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
    const { result: tasks, isLoading, error, fetchData } = useFetch([] as Task[], TaskService.getTasks);

    // const getTasks = (projectId: number) => {
    //     return tasks.value.filter(task => task.projectId === projectId)
    // }

    const createTask = async (task: TaskCreate) => {
        const response = await TaskService.createTask({
            id: tasks.value.reduce((maxId, project) => Math.max(maxId, project.id), 0) + 1,
            ...task,
        });

        tasks.value.push(response);
    }

    return {
        tasks,
        isLoading,
        error,
        // getTasks,
        fetchData,
        createTask
    } as const;
})
