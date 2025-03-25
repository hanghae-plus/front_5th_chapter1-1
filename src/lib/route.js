import { MainPage, ProfilePage, LoginPage, ErrorPage } from "../page";
import { mode } from "./mode";

export const route = () => {
  let currentMode = mode();

  if (currentMode === "hash") {
    switch (location.hash) {
      case "#/":
        return MainPage();
      case "#/profile":
        return ProfilePage();
      case "#/login":
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
        return LoginPage();
      default:
        return ErrorPage();
    }
  }
};
