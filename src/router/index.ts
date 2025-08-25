// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { LAYOUTS } from '@/constants/layout-constants'

type Layout = (typeof LAYOUTS)[keyof typeof LAYOUTS]

declare module 'vue-router' {
  interface RouteMeta {
    layout?: Layout
  }
}

const Home = () => import('@/pages/index.vue')
const KeywordGenerator = () => import('@/pages/keyword-generator/KeywordGenerator.vue')
const ReviewApp = () => import('@/pages/review-app/review-app.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home, meta: { layout: LAYOUTS.DEFAULT } },
  { path: '/keyword-generator', name: 'keyword-generator', component: KeywordGenerator, meta: { layout: LAYOUTS.DEFAULT } },
  { path: '/review-app', name: 'review-app', component: ReviewApp, props: route => ({ text: route.query.text ?? '' }) }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
