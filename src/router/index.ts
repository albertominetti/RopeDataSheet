import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import RopeDataSheetPage from "../views/RopeDataSheetPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "RopeDataSheetPage",
    component: RopeDataSheetPage,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
