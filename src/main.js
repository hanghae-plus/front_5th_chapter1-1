import MainPage from "./page/MainPage";
import ErrorPage from "./page/ErrorPage";
import LoginPage from "./page/LoginPage";
import ProfilePage from "./page/ProfilePage";
import createRouter, { navigateTo } from "./lib/router";
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

const routes = [
  { fragment: "/", component: MainPage },
  { fragment: "/login", component: guard.main(LoginPage) },
  { fragment: "/profile", component: guard.auth(ProfilePage) },
  { fragment: "*", component: ErrorPage },
];

export const router = createRouter({ routes, type: "history" });

router.start();

router.navigate(location.pathname);
