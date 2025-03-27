import LoginPage from "./pages/loginPage";
import MainPage from "./pages/HomePage";
import ProfilePage from "./pages/profilePage";
import NotFoundPage from "./pages/NotFoundPage";

export const isProd = location.hostname.includes("github.io");
export const BASE_PATH = isProd ? "/front_5th_chapter1-1" : "";

export const routes = {
  "/login": LoginPage(),
  "/profile": ProfilePage(),
  "/": MainPage(),
  "*": NotFoundPage(),
};
