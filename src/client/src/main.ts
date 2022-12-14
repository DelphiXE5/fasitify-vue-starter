import { createSSRApp } from 'vue'
import {
  createMemoryHistory,
  createWebHistory,
  createRouter,
  type RouteLocationRaw
} from 'vue-router'

import base from './App.vue'
import routes from './router/index'
import { createRouteManager } from './router/routeManager'

export async function createApp(ctx: any, url?: RouteLocationRaw) {
  const instance = createSSRApp(base)
  const history = import.meta.env.SSR
    ? createMemoryHistory()
    : createWebHistory()
  const router = createRouter({
    history: history,
    routes: routes
  })
  instance.use(router)

  const routeManager = createRouteManager({ ctx, router, routes, ssr: import.meta.env.SSR })
  instance.use(routeManager)

  if (url) {
    router.push(url)
    await router.isReady()
  }

  return { ctx, router, instance }
}