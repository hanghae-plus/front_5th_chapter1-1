import { MainPage } from "../pages/MainPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { navigate } from "./router.js";

const isLoggedIn = !!localStorage.getItem("user");

export const ROUTES = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": () => {
    return isLoggedIn ? ProfilePage() : navigate("/login") || null;
  },
};
