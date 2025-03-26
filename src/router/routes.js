import { MainPage } from "../pages/MainPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { navigate } from "./router.js";
import { authStore } from "../stores/authStore.js";
import { NotFoundPage } from "../pages/NotFoundPage.js";

export const ROUTES = {
  "/": MainPage,
  "/login": () => {
    if (authStore.user) {
      navigate("/");
    }
    return LoginPage();
  },
  "/profile": () => {
    if (!authStore.user) {
      navigate("/login");
      return null;
    }
    return ProfilePage();
  },
  "/404": NotFoundPage,
};
