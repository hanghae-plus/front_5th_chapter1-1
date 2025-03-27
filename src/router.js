import { ErrorPage, LoginPage, MainPage, ProfilePage } from "./containers";
import { ROUTE } from "./shared/route";
import { store } from "./shared/store";

export const PROJECT_NAME = "/front_5th_chapter1-1";

const routes = {
  [ROUTE.main]: () => MainPage(),
  [ROUTE.login]: () => {
    if (store.getState("isLoggedIn")) {
      pushState(ROUTE.main);
      return MainPage();
    }
    return LoginPage();
  },
  [ROUTE.profile]: () => {
    if (!store.getState("isLoggedIn")) {
      pushState(ROUTE.login);
      return LoginPage();
    }
    return ProfilePage();
  },
  [ROUTE.error]: () => ErrorPage(),
};

export const getPath = () => {
  const path = window.location.pathname;
  const hashPath = window.location.hash?.slice(1);
  const targetPath = hashPath || path;

  return targetPath.replace(PROJECT_NAME, "");
};

export const getHtmlByPath = () => {
  const path = getPath();
  const router = routes[path] || routes[ROUTE.error];

  return router();
};

export const makePath = (path) => {
  const isGithubPage = window.location.hostname.includes("github.io");
  const targetPath = path.replace(PROJECT_NAME, "");

  return isGithubPage ? `${PROJECT_NAME}${targetPath}` : targetPath;
};

export const pushState = (path) => {
  const targetPath = makePath(path);

  window.history.pushState({}, "", targetPath);
};
