import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import RopeDataSheetPage from "../views/RopeDataSheetPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: process.env.NODE_ENV === "production" ? "/rope-data-sheet/" : "/",
    name: "RopeDataSheetPage",
    component: RopeDataSheetPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
