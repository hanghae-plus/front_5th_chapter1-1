import { MainPage } from "../pages/HomePage.js";
import { ErrorPage } from "../pages/ErrorPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { userContext } from "../context/userContext.js";

// 경로 상수 정의
const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
  ERROR: "/error",
};

const routes = {
  [PATHS.HOME]: MainPage,
  "/home": MainPage,
  [PATHS.LOGIN]: (isLoggedIn) =>
    isLoggedIn ? { redirect: PATHS.HOME } : LoginPage(),
  [PATHS.PROFILE]: (isLoggedIn) => (isLoggedIn ? ProfilePage() : LoginPage()),
};

export function resolveRoute(path) {
  const baseUrl = "/front_5th_chapter1-1"; // baseUrl 정의
  const { isLoggedIn } = userContext.getState();
  const cleanPath = path.replace(baseUrl, ""); // baseUrl 제거
  const routeHandler = routes[cleanPath] || ErrorPage;
  return typeof routeHandler === "function"
    ? routeHandler(isLoggedIn)
    : routeHandler();
}
