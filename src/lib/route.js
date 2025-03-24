import { MainPage, ProfilePage, LoginPage, ErrorPage } from "../page";

export const route = () => {
  if (location.pathname === "/") return MainPage();
  if (location.pathname === "/profile") return ProfilePage();
  if (location.pathname === "/login") return LoginPage();
  return ErrorPage();
};
