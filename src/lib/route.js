import { MainPage, ProfilePage, LoginPage, ErrorPage } from "../page";
import User from "../store/user";
import { mode } from "./mode";

export const route = () => {
  let currentMode = mode();
  let user = new User();
  let username = user.get().username;

  if (currentMode === "hash") {
    switch (location.hash) {
      case "#/":
        return MainPage();
      case "#/profile":
        return ProfilePage();
      case "#/login":
        if (username) return MainPage();
        return LoginPage();
      default:
        return ErrorPage();
    }
  }
  if (currentMode === "history") {
    switch (location.pathname) {
      case "/":
        return MainPage();
      case "/profile":
        return ProfilePage();
      case "/login":
        if (username) return MainPage();
        return LoginPage();
      default:
        return ErrorPage();
    }
  }
};
