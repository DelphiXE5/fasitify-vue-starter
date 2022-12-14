//@ts-nocheck
import { createApp } from './main'

createApp(window.hydration)
  .then(({ instance, router }) => {
    router.isReady().then(() => {
      instance.mount('app')
    })
  })