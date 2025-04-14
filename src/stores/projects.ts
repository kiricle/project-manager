import { useFetch } from '@/composables/useFetch'
import type { Project } from '@/models/project'
import { ProjectService } from '@/service/project'
import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', () => {
  const { result: projects, isLoading, error, fetchData } = useFetch([] as Project[], ProjectService.getProjects);

  return {
    projects,
    isLoading,
    error,
    fetchData,
  } as const;
})
