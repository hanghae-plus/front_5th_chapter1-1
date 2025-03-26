import { MainPage, ProfilePage, LoginPage, ErrorPage } from "../page";
import User from "../store/user";
import { mode } from "./mode";

export const route = () => {
  let routeMode = mode();
  let user = new User();
  let username = user.get().username;
  if (routeMode === "hash") {
    switch (window.location.hash) {
      case "#/":
        return MainPage();
      case "#/profile":
        if (!username) {
          return LoginPage();
        }
        return ProfilePage();
      case "#/login":
        if (username) {
          return MainPage();
        }
        return LoginPage();
      default:
        return ErrorPage();
    }
  }
  if (routeMode === "history") {
    switch (location.pathname) {
      case "/":
        return MainPage();
      case "/profile":
        if (!username) {
          return LoginPage();
        }
        return ProfilePage();
      case "/login":
        if (username) {
          history.pushState(null, "", "/");
          return MainPage();
        }
        return LoginPage();
      default:
        return ErrorPage();
    }
  }
};
