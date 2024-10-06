import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Books from "../views/Books.vue";

const BASE_URL: string = "/";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Books",
    component: Books,
  },
];

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
});

export default router;
