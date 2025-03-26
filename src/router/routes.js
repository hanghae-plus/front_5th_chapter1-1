import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";

export const BASE_PATH =
  import.meta.env.MODE === "production" ? "/front_5th_chapter1-1" : "";

export const ROUTE = {
  HOME: { name: "홈", path: "/", hash: "#/", component: MainPage },
  LOGIN: {
    name: "로그인",
    path: "/login",
    hash: "#/login",
    component: LoginPage,
    isPublic: true,
  },
  PROFILE: {
    name: "프로필",
    path: "/profile",
    hash: "#/profile",
    component: ProfilePage,
    isPrivate: true,
  },
  PAGE_NOT_FOUND: {
    name: "404",
    path: "/404",
    hash: "#/404",
    component: ErrorPage,
  },
};

export const ROUTES = Object.values(ROUTE);
