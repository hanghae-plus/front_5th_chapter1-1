import MainPage from "./page/MainPage";
import ErrorPage from "./page/ErrorPage";
import LoginPage from "./page/LoginPage";
import ProfilePage from "./page/ProfilePage";
import { hashRouter, hashNavigateTo } from "./lib/router";
import auth from "./auth";

const guard = {
  main: (component) => {
    return () => {
      if (auth.loggedIn) {
        hashNavigateTo("#/");
        return MainPage();
      }
      return component();
    };
  },
  auth: (component) => {
    return () => {
      if (!auth.loggedIn) {
        hashNavigateTo("#/login");
        return LoginPage();
      }
      return component();
    };
  },
};

const routes = [
  { fragment: "#/", component: MainPage },
  { fragment: "#/login", component: guard.main(LoginPage) },
  { fragment: "#/profile", component: guard.auth(ProfilePage) },
  { fragment: "*", component: ErrorPage },
];

const router = (window.router = hashRouter(routes));

router.start();

router.navigate(location.hash);
