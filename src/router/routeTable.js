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

const baseUrl = "/front_5th_chapter1-1"; // baseUrl 정의

const routes = {
  [PATHS.HOME]: MainPage,
  "/home": MainPage,
  [PATHS.LOGIN]: (isLoggedIn) =>
    isLoggedIn ? { redirect: PATHS.HOME } : LoginPage(),
  [PATHS.PROFILE]: (isLoggedIn) => (isLoggedIn ? ProfilePage() : LoginPage()),
};

export function resolveRoute(path) {
  const { isLoggedIn } = userContext.getState();

  // 현재 호스트가 GitHub Pages인지 확인
  const isGithubPages = window.location.origin.includes("github.io");

  // 경로에서 baseUrl을 제거 (배포 환경에서만 필요)
  const cleanPath = path.replace(baseUrl, "");

  // 배포 환경일 경우 baseUrl을 포함한 경로 사용
  const routePath = isGithubPages ? baseUrl + cleanPath : cleanPath;

  const routeHandler = routes[routePath] || ErrorPage;

  return typeof routeHandler === "function"
    ? routeHandler(isLoggedIn)
    : routeHandler();
}
