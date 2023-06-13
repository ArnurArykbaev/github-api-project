import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/Main.vue";
import RepositoryPage from "../views/RepositoryPage.vue";

export function setupRouter() {
  // setup routes
  const routes = [
    {
      path: "/github-api-project/",
      name: "home",
      component: MainPage,
    },
    {
      path: "/github-api-project/:owner/:name",
      name: "repository",
      component: RepositoryPage,
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ left: 0, top: 0, behavior: "smooth" });
        }, 300);
      });
    },
  });

  return router;
}
