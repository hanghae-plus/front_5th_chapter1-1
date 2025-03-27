import userStore from "../stores/userStore.js";
import HistoryRouter from "./historyRouter.js";
import HashRouter from "./hashRouter.js";
import authMiddleWare from "../middlewares/authMiddleware.js";

import MainPage from "../pages/MainPage.js";
import ProfilePage from "../pages/ProfilePage.js";
import LoginPage from "../pages/LoginPage.js";
import ErrorPage from "../pages/ErrorPage.js";

let currentRouter = null;

const routes = [
  { path: "/", component: MainPage },
  { path: "/profile", component: ProfilePage, meta: { requiresAuth: true } },
  { path: "/login", component: LoginPage, meta: { guestOnly: true } },
  { path: "/*", component: ErrorPage },
];

const Router = {
  history: HistoryRouter,
  hash: HashRouter,
};

const createRouter = ({ type = "history" }) => {
  if (currentRouter) {
    return currentRouter;
  }

  currentRouter = new Router[type](routes);
  currentRouter.use(authMiddleWare(userStore)).init();

  return currentRouter;
};

const useRouter = () => {
  if (!currentRouter) {
    throw new Error("Router is not initialized");
  }
  return currentRouter;
};

export { createRouter, useRouter };
