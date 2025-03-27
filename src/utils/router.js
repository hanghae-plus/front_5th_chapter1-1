import MainPage from "../components/MainPage.jsx";
import ProfilePage from "../components/ProfilePage.jsx";
import LoginPage from "../components/LoginPage.jsx";
import NotFoundPage from "../components/NotFoundPage.jsx";
import { isLoggedIn, isNotLoggedIn } from "./login.js";

/**
 * 라우트 설정
 * - component: 렌더링할 컴포넌트
 * - guard: 접근 제어 함수 (true 반환 시 redirect로 이동)
 * - redirect: guard가 true일 때 이동할 경로
 */
const routes = {
  "/": {
    component: MainPage,
  },
  "/profile": {
    component: ProfilePage,
    guard: isNotLoggedIn, // 로그인하지 않은 경우 true 반환
    redirect: "/login",
  },
  "/login": {
    component: LoginPage,
    guard: isLoggedIn, // 로그인한 경우 true 반환
    redirect: "/",
  },
  "*": {
    component: NotFoundPage,
  },
};

/**
 * 라우터 타입에 따른 페이지 이동 처리
 * @param {string} path 이동할 경로
 * @param {boolean} replace 리다이렉션 여부
 */
const push = (path, replace = false) => {
  if (App.RouterType === "basic") {
    window.history[replace ? "replaceState" : "pushState"]({}, "", path);
  } else if (App.RouterType === "hash") {
    window.location.hash = path.startsWith("/") ? path : `/${path}`;
  }
};

/**
 * 현재 라우터 타입에 따른 경로 반환
 * @returns {string} 현재 경로
 */
const getPath = () => {
  return App.RouterType === "basic"
    ? window.location.pathname
    : window.location.hash.slice(1) || "/";
};

/**
 * 앱 인스턴스
 * @type {Object}
 * @property {string} RouterType 라우터 타입
 * @property {Function} push 페이지 이동 함수
 * @property {Function} Render 렌더링 함수
 */
export const App = {
  RouterType: "basic", // "basic" | "hash"
  push,
  Render() {
    const path = getPath();
    const route = routes[path] || routes["*"];

    // 컴포넌트 렌더링
    let rendered = route.component();

    // 가드 체크 및 리다이렉션
    if (route.guard && route.guard()) {
      // replace 옵션을 사용하여 브라우저 히스토리에 남지 않도록 함
      App.push(route.redirect, true);
      rendered = routes[route.redirect].component();
    }

    // DOM 업데이트
    document.getElementById("root").innerHTML = rendered;
  },
};
