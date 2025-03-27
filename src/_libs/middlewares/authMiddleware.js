import LoginPage from "../../_components/pages/LoginPage";
import MainPage from "../../_components/pages/MainPage";
import route, { loggedInRoutes, loggedOutRoutes } from "../../_constants/route";
import router from "../router";
import state from "../state";

/**
 * 인증 미들웨어
 *
 * @param {Function} fn
 * @returns {Function | string}
 */
const authMiddleware = (fn) => {
  const isLoggedIn = state.isLoggedIn;

  const isLoggedInRoute = loggedInRoutes.some(
    (route) => route.path === state.pathname,
  );
  const isLoggedOutRoute = loggedOutRoutes.some(
    (route) => route.path === state.pathname,
  );

  // 비로그인 상태에서 로그인 상태에서 접근 가능한 경로로 접근한 경우
  if (!isLoggedIn && isLoggedInRoute) {
    router.push(route.login.path);
    return LoginPage();
  }

  // 로그인 상태에서 로그아웃 상태에서 접근 가능한 경로로 접근한 경우
  if (isLoggedIn && isLoggedOutRoute) {
    router.push(route.home.path);
    return MainPage();
  }

  return fn();
};

export default authMiddleware;
