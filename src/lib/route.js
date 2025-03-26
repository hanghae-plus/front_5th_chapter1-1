import { MainPage, ProfilePage, LoginPage, ErrorPage } from "../page";
import User from "../store/user";
import { mode } from "./mode";
export const route = () => {
  let user = new User();
  let isLogin = user.isLogin();

  let isHashMode = mode() === "hash";

  let path = isHashMode ? window.location.hash.slice(1) : location.pathname;
  if (path === "/") return MainPage();
  if (path === "/profile") {
    return isLogin ? ProfilePage() : LoginPage();
  }
  if (path === "/login") {
    return isLogin ? MainPage() : LoginPage();
  }
  return ErrorPage();
};
