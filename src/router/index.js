import { createRouter, createWebHistory } from 'vue-router'

// Layout
import DefaultLayout from '@/layouts/default.vue'

// Pages (lazy)
const Home = () => import('@/pages/index.vue')
const KeywordGenerator = () => import('@/pages/keyword-generator/KeywordGenerator.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', name: 'home', component: Home },
        { path: 'keyword-generator', name: 'keyword-generator', component: KeywordGenerator },
      ],
    },
  ],
})

export default router