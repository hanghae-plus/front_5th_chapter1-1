import { createRouter, getCurrentComponent } from "./core/router/router";
import render from "./render";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/NotFoundPage";

createRouter([
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/profile",
    component: ProfilePage,
  },
  {
    path: "/404",
    type: "error",
    component: ErrorPage,
  },
]);

render(getCurrentComponent());
