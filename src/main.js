import MainPage from "./views/MainPage";
import ProfilePage from "./views/ProfilePage";
import LoginPage from "./views/LoginPage";
import NotFoundPage from "./views/NotFoundPage";

import { createHistoryRouter, Navigate } from "./libs/router";
import store from "./store";
import { HISTORY_ROUTER_BASENAME } from "./constants";

const createRoot = (root) => {
  const render = (callback) => {
    callback(root);
  };

  return { render };
};

const AuthGuard = (component) => {
  return () => {
    if (!store.isLoggedIn()) {
      return Navigate({ to: "/login", replace: true });
    }

    return component();
  };
};

const PublicGuard = (component) => {
  return () => {
    if (store.isLoggedIn()) {
      return Navigate({ to: "/", replace: true });
    }

    return component();
  };
};

const root = document.getElementById("root");
const router = createHistoryRouter(
  [
    { path: "/", component: MainPage },
    { path: "/profile", component: AuthGuard(ProfilePage) },
    { path: "/login", component: PublicGuard(LoginPage) },
    { path: "*", component: NotFoundPage },
  ],
  { basename: HISTORY_ROUTER_BASENAME },
);

createRoot(root).render(router);
