import { MainPage, NotFoundPage, LoginPage, ProfilePage } from "../pages";

export const routes = {
  "/": { redirect: "/main" },
  "/login": { component: LoginPage },
  "/main": { component: MainPage },
  "/profile": { component: ProfilePage },
  "*": { component: NotFoundPage },
};
