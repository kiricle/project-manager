import { useFetch } from '@/composables/useFetch'
import type { Task, TaskCreate, TaskStatus } from '@/models/project'
import { TaskService } from '@/service/task'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
    const { result: tasks, isLoading, error, fetchData } = useFetch([] as Task[], TaskService.getTasks);

    const createTask = async (task: TaskCreate) => {
        const response = await TaskService.createTask({
            id: tasks.value.reduce((maxId, project) => Math.max(maxId, project.id), 0) + 1,
            ...task,
        });

        tasks.value.push(response);
    }

    const updateTaskOrder = (status: TaskStatus, oldOrder: number, newOrder: number, projectId: number) => {
        const tasksToChange = tasks.value.filter((task) => task.projectId === projectId && task.status === status);
        const changedIdsMap: Record<number, Task> = {};
        const newArr = tasksToChange.map((task) => {
            if (oldOrder < newOrder) {
                if (task.order > oldOrder && task.order <= newOrder) {
                    const newTask = { ...task, order: task.order - 1 }
                    changedIdsMap[task.id] = newTask;
                    return newTask
                }

                if (task.order === oldOrder) {
                    const newTask = { ...task, order: newOrder }
                    changedIdsMap[task.id] = newTask;
                    return newTask
                }

                if (task.order < oldOrder) {
                    return task
                }
            }

            if (oldOrder > newOrder) {
                if (task.order >= newOrder && task.order < oldOrder) {
                    const newTask = { ...task, order: task.order + 1 }
                    changedIdsMap[task.id] = newTask
                    return newTask
                }

                if (task.order === oldOrder) {
                    const newTask = { ...task, order: newOrder }
                    changedIdsMap[task.id] = newTask
                    return newTask
                }

                if (task.order > oldOrder) {
                    return task
                }
            }
        })


        tasks.value = tasks.value.map((task) => changedIdsMap[task.id] ? changedIdsMap[task.id] : task)
        // json-server має обмежені можливості, тому без цієї логіки
        //TaskService.updateTasks(tasks.value)
    }

    return {
        tasks,
        isLoading,
        error,
        fetchData,
        createTask,
        updateTaskOrder
    } as const;
})
