import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import XTermPage from "../pages/old/XTermPage.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: IndexPage },
  { path: "/old/xterm", component: XTermPage },
];

export default routes;
