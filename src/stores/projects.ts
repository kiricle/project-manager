import { useFetch } from '@/composables/useFetch'
import type { Project, ProjectCreate } from '@/models/project'
import { ProjectService } from '@/service/project'
import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', () => {
  const { result: projects, isLoading, error, fetchData } = useFetch([] as Project[], ProjectService.getProjects);

  const createProject = async (project: ProjectCreate) => {
    const response = await ProjectService.createProject({
      id: projects.value.reduce((maxId, project) => Math.max(maxId, project.id), 0) + 1,
      ...project,
      status: 'in_progress',
      createdAt: new Date().toString(),
      tasksId: [],
    });

    projects.value.push(response);
  }

  return {
    projects,
    isLoading,
    error,
    fetchData,
    createProject,
  } as const;
})
