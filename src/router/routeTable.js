import { MainPage } from "../pages/HomePage";
import { ErrorPage } from "../pages/ErrorPage";
import { ProfilePage } from "../pages/ProfilePage";
import { LoginPage } from "../pages/LoginPage";
import { userContext } from "../context/userContext";

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
  const { isLoggedIn } = userContext.getState();
  const routeHandler = routes[path] || ErrorPage;
  return typeof routeHandler === "function"
    ? routeHandler(isLoggedIn)
    : routeHandler();
}
