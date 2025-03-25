import { MainPage } from "../pages/MainPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { navigate } from "./router.js";

export const ROUTES = {
  "/": MainPage,
  "/login": () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      navigate("/");
    }
    return LoginPage();
  },
  "/profile": () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      navigate("/login");
      return null;
    }
    return ProfilePage();
  },
};
