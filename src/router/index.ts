import HomePage from '@/pages/ProjectsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/projects/:id',
      name: 'project',
      component: () => import('@/pages/TasksPage.vue'),
    },
  ],
})

export default router
