import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticateUser from '@/views/AuthenticateUser.vue'
import Dashboard from '@/views/Dashboard.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound
  },
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/authenticate/:slug",
    name: "AuthenticateUser",
    component: AuthenticateUser,
  },
  {
    path: "/user/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
