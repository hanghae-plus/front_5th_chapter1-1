import { MainPage } from "../pages/MainPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import { ErrorPage } from "../pages/ErrorPage.js";

export const ROUTE_PATHS = {
  MAIN: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
  ERROR: "*",
};

export const routes = [
  { path: ROUTE_PATHS.MAIN, component: MainPage },
  { path: ROUTE_PATHS.LOGIN, component: LoginPage },
  { path: ROUTE_PATHS.PROFILE, component: ProfilePage, requiresAuth: true },
  { path: ROUTE_PATHS.ERROR, component: ErrorPage },
];
