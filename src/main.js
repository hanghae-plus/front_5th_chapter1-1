import MainPage from "./page/MainPage";
import ErrorPage from "./page/ErrorPage";
import LoginPage from "./page/LoginPage";
import ProfilePage from "./page/ProfilePage";
import { historyRouter, navigateTo } from "./lib/router";
import auth from "./auth";
import { BASE_ROUTE } from "./constants/basePath";

const guard = {
  main: (component) => {
    return () => {
      if (auth.loggedIn) {
        navigateTo({ path: `${BASE_ROUTE}/`, replace: true });
        return MainPage();
      }
      return component();
    };
  },
  auth: (component) => {
    return () => {
      if (!auth.loggedIn) {
        navigateTo({ path: `${BASE_ROUTE}/login`, replace: true });
        return LoginPage();
      }
      return component();
    };
  },
};

const routes = [
  { fragment: `${BASE_ROUTE}/`, component: MainPage },
  { fragment: `${BASE_ROUTE}/login`, component: guard.main(LoginPage) },
  { fragment: `${BASE_ROUTE}/profile`, component: guard.auth(ProfilePage) },
  { fragment: "*", component: ErrorPage },
];

const router = (window.router = historyRouter(routes));

router.start();

router.navigate(location.pathname);
