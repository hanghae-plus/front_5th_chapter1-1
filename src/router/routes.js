import { ErrorPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import { MainPage } from "../pages/MainPage";
import { ProfilePage } from "../pages/ProfilePage";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function generateRoutesMap(baseUrl = "/", paths = {}) {
  const modifiedBaseUrl = baseUrl.replace(/\/+$/, "");

  return Object.fromEntries(
    Object.entries(paths).map(([key, path]) => {
      if (path === "*") return [key, path];
      return [key, `${modifiedBaseUrl}/${path.replace(/^\/+/, "")}`];
    }),
  );
}

export const ROUTES_MAP = generateRoutesMap(BASE_URL, {
  HOME: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
  NOT_FOUND: "*",
});

export const ROUTES = [
  {
    path: ROUTES_MAP.HOME,
    component: MainPage,
    authRequired: false,
  },
  {
    path: ROUTES_MAP.PROFILE,
    component: ProfilePage,
    authRequired: true,
  },
  {
    path: ROUTES_MAP.LOGIN,
    component: LoginPage,
    authRequired: false,
  },
  {
    path: ROUTES_MAP.NOT_FOUND,
    component: ErrorPage,
    authRequired: false,
  },
];
