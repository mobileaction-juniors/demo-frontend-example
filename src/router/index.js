import { createRouter, createWebHistory } from 'vue-router'
import defaultText from '@/constants/DefaultText';

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
      path: '/keyword-density',
      name: 'KeywordDensity',
      component: () => import('../pages/keyword-density/KeywordDensity.vue'),
      props: { defaultText },
    },
    { 
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../pages/not-found/NotFound.vue'),
      meta: {
        hideHeader: true
      }
    }
  ]
})

export default router
