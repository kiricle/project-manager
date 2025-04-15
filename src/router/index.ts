import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ProjectPage from '@/pages/ProjectPage.vue'

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
      component: () => import('@/pages/ProjectPage.vue'),
    },
  ],
})

export default router
