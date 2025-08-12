import { createRouter, createWebHistory } from 'vue-router'
import { LAYOUT } from '@/layouts/constants/layout-constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/VHomepage.vue'),
      meta: { layout: LAYOUT.DEFAULT },
    },
    {
      path: '/keyword-generator',
      name: 'KeywordGenerator',
      component: () => import('@/pages/VKeywordGenerator.vue'),
      meta: { layout: LAYOUT.DEFAULT },
    }
  ]
})

export default router
