import { useFetch } from '@/composables/useFetch'
import type { Project, ProjectCreate } from '@/models/project'
import { ProjectService } from '@/service/project'
import { TaskService } from '@/service/task'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
    // const { result: tasks, isLoading, error, fetchData } = useFetch([] as Project[], TaskService.getTasks);

    // const createTask = async (task: TaskCreate) => {
        // const response = await ProjectService.createProject({
        //     id: tasks.value.reduce((maxId, project) => Math.max(maxId, project.id), 0) + 1,
        //     ...task,
        //     status: 'in_progress',
        //     createdAt: new Date(),
        //     tasksId: [],
        // });

        // projects.value.push(response);
    // }

    // return {
    //     tasks,
    //     isLoading,
    //     error,
    //     fetchData,
    //     createTask,
    // } as const;
})
