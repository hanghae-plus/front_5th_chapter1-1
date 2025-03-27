import { HomeContent, ProfileContent } from "../contents";
import { ErrorPage, LoginPage, MainPage } from "../pages";

export const ROUTE_PATHS = {
  HOME: "/",
  PROFILE: "/profile",
  LOGIN: "/login",
  ERROR: "/error",
};

export const ROUTE_TYPES = {
  TAB: "TAB",
  PAGE: "PAGE",
};

export const routes = {
  [ROUTE_PATHS.HOME]: {
    id: "home",
    type: ROUTE_TYPES.TAB,
    container: () => MainPage(HomeContent),
    content: HomeContent,
    needAuth: false,
  },
  [ROUTE_PATHS.PROFILE]: {
    id: "profile",
    type: ROUTE_TYPES.TAB,
    container: () => MainPage(ProfileContent),
    content: ProfileContent,
    needAuth: true,
  },
  [ROUTE_PATHS.LOGIN]: {
    id: "login",
    type: ROUTE_TYPES.PAGE,
    container: LoginPage,
    needAuth: false,
  },
  [ROUTE_PATHS.ERROR]: {
    id: "error",
    type: ROUTE_TYPES.PAGE,
    container: ErrorPage,
    needAuth: false,
  },
};
