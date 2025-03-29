import { MainPage } from "../pages/MainPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { NotFoundPage } from "../pages/NotFoundPage.js";
import { authStore } from "../stores/authStore.js";
import { navigate } from "./router.js";

const isProd = location.hostname.includes("github.io");
export const BASE_PATH = isProd ? "/front_5th_chapter1-1" : "";

export const ROUTES = {
  [BASE_PATH + "/"]: MainPage,
  [BASE_PATH + "/login"]: () => {
    if (authStore.user) {
      navigate(BASE_PATH + "/");
    }
    return LoginPage();
  },
  [BASE_PATH + "/profile"]: () => {
    if (!authStore.user) {
      navigate(BASE_PATH + "/login");
      return null;
    }
    return ProfilePage();
  },
  [BASE_PATH + "/404"]: NotFoundPage,
};
