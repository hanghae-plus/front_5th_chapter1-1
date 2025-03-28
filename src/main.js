import MainPage from "./page/MainPage";
import ErrorPage from "./page/ErrorPage";
import LoginPage from "./page/LoginPage";
import ProfilePage from "./page/ProfilePage";
import { historyRouter, navigateTo } from "./lib/router";
import auth from "./auth";
import { basePath } from "./constants/basePath";

const guard = {
  main: (component) => {
    return () => {
      if (auth.loggedIn) {
        navigateTo({ path: basePath.main, replace: true });
        return MainPage();
      }
      return component();
    };
  },
  auth: (component) => {
    return () => {
      if (!auth.loggedIn) {
        navigateTo({ path: basePath.login, replace: true });
        return LoginPage();
      }
      return component();
    };
  },
};

const routes = [
  { fragment: basePath.main, component: MainPage },
  { fragment: basePath.login, component: guard.main(LoginPage) },
  { fragment: basePath.profile, component: guard.auth(ProfilePage) },
  { fragment: "*", component: ErrorPage },
];

const router = (window.router = historyRouter(routes));

router.start();

router.navigate(location.pathname);
