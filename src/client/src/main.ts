import { createSSRApp } from 'vue'
import {
  createMemoryHistory,
  createWebHistory,
  type RouteLocationRaw
} from 'vue-router'

import base from './App.vue'
import router from './router/index'

export async function createApp (ctx: any, url?: RouteLocationRaw) {
  const instance = createSSRApp(base)
  const history = import.meta.env.SSR
    ? createMemoryHistory()
    : createWebHistory()
  instance.use(router)

  if (url) {
    router.push(url)
    await router.isReady()
  }

  return { ctx, router, instance }
}