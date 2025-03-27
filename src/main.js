import { Router } from "./router/Router";
import MainPage from "./pages/MainPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import ErrorPage from "./pages/ErrorPage.js";

const isProduction = import.meta.env.MODE === "production";
const BASE_ROUTE = isProduction ? "/front_5th_chapter1-1" : "";

// 라우팅 경로 생성 헬퍼 함수
const getPath = (path) => `${BASE_ROUTE}${path}`;

// 라우터 설정
const routes = {
  [getPath("/")]: { render: MainPage },
  [getPath("/login")]: { render: LoginPage },
  [getPath("/profile")]: { render: ProfilePage },
  default: { render: ErrorPage },
};

const router = new Router(routes);

// 전역 라우터 설정 및 베이스 경로 설정
window.router = router;
window.BASE_ROUTE = BASE_ROUTE;

// 라우터 시작
router.start();
