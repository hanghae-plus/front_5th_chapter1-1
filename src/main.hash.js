import MainPage from "./views/MainPage";
import ProfilePage from "./views/ProfilePage";
import LoginPage from "./views/LoginPage";
import NotFoundPage from "./views/NotFoundPage";

import { createHashRouter, Navigate } from "./libs/router";
import store from "./store";

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
const router = createHashRouter([
  { path: "/", component: MainPage },
  { path: "/profile", component: AuthGuard(ProfilePage) },
  { path: "/login", component: PublicGuard(LoginPage) },
  { path: "*", component: NotFoundPage },
]);

createRoot(root).render(router);
