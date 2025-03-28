import MainPage from "./page/MainPage";
import ErrorPage from "./page/ErrorPage";
import LoginPage from "./page/LoginPage";
import ProfilePage from "./page/ProfilePage";
import { historyRouter, navigateTo } from "./lib/router";
import auth from "./auth";

const guard = {
  main: (component) => {
    return () => {
      if (auth.loggedIn) {
        navigateTo({ path: "/", replace: true });
        return MainPage();
      }
      return component();
    };
  },
  auth: (component) => {
    return () => {
      if (!auth.loggedIn) {
        navigateTo({ path: "/login", replace: true });
        return LoginPage();
      }
      return component();
    };
  },
};

const isProduction = import.meta.env.MODE === "production";
const BASE_ROUTE = isProduction ? "/front_5th_chapter1-1" : "";

const routes = [
  { fragment: `${BASE_ROUTE}/`, component: MainPage },
  { fragment: `${BASE_ROUTE}/login`, component: guard.main(LoginPage) },
  { fragment: `${BASE_ROUTE}/profile`, component: guard.auth(ProfilePage) },
  { fragment: `${BASE_ROUTE}*`, component: ErrorPage },
];

const router = (window.router = historyRouter(routes));

router.start();

router.navigate(location.pathname);
