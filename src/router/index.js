import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/index.vue')
    },
    {
      path: '/keyword-generator',
      name: 'KeywordGenerator',
      component: () => import('../pages/keyword-generator/KeywordGenerator.vue')
    },
    {
      path: '/keyword-analyzer',
      name: 'KeywordAnalyzer',
      component: () => import('../pages/keyword-analyzer/KeywordAnalyzer.vue')
    }
  ]
})

export default router
