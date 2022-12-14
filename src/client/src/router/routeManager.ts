//@ts-nocheck
import type { Router } from "vue-router"

interface pageManagerArgs {
    ctx: any,
    router: Router,
    routes: Array<Object>,
    ssr: boolean
}
export function createRouteManager({
    ctx,
    router,
    routes,
    ssr
}: pageManagerArgs) {
    return (instance: any) => {
        const globalProperties = instance.config.globalProperties
        globalProperties.$error = null
        if (ssr) {
            // Populate serverSideProps with SSR context data
            globalProperties.$serverSideProps = ctx.serverSideProps
        } else {
            // Populate serverSideProps with hydrated SSR context data if avilable
            globalProperties.$serverSideProps = window.hydration.serverSideProps
        }
        // A way to quickly access getServerSideProps by matched path
        const routeMap = Object.fromEntries(
            routes.map(({ path, getServerSideProps }) => {
                return [path, getServerSideProps]
            })
        )
        // Set up Vue Router hook
        if (!import.meta.env.SSR) {
            router.beforeEach(async (to) => {
                // Ensure hydration is always reset after a page renders
                window.hydration = {}
                // If getServerSideProps is set...
                if (routeMap[to.matched[0].path]) {
                    await fetch(`/json${to.path}`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.statusCode === 500) {
                                globalProperties.$error = data.message
                            } else {
                                globalProperties.$serverSideProps = data
                            }
                        })
                        .catch((error) => {
                            globalProperties.$error = error
                        })
                }
            })
        }
    }
}