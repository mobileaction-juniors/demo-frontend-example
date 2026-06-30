import { createRouter, createWebHistory } from 'vue-router'

const STATIC_PARENT_TEXT = 'Our Keyword Counter tool lets you count how many times keywords are repeated in any text, and also calculates the density of these keywords. The keyword density is the percentage of times a keyword appears in a text compared to the total number of words in that text. Simply write or paste your text here and hit "count".';

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
      props: { initialText: STATIC_PARENT_TEXT }
    }
  ]
})

export default router
