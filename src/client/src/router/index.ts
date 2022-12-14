import type { RouteRecordRaw } from 'vue-router'


export const routes = routePostProcess([
  {
    path: '/',
    name: 'home',
    component: Object.values(import.meta.globEager('../views/HomeView.vue'))[0],
  },
  {
    path: '/about',
    name: 'about',
    component: Object.values(import.meta.globEager('../views/AboutView.vue'))[0],
  }
]);

export default routes

function routePostProcess(routes: any[]): RouteRecordRaw[] {

  return routes.map<any>(route => {
    route.getServerSideProps = route.component.getServerSideProps;
    route.component = route.component.default;
    return route;
  });
}