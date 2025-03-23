import { MainPage, ErrorPage, LoginPage, ProfilePage } from "../pages";

export const routes = {
  "/": { redirect: "/login" },
  "/login": { component: LoginPage },
  "/main": { component: MainPage },
  "/profile": { component: ProfilePage },
  "/error": { component: ErrorPage },
  "*": { component: ErrorPage },
};
