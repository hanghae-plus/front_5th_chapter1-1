import LoginPage from "../../_components/pages/LoginPage";
import route from "../../_constants/route";
import router from "../router";
import state from "../state";

/**
 * 로그아웃 미들웨어
 *
 * @description 예외적으로 처리 아니 왜 로그아웃이 버튼이 아니라 anchor인가요 선생님
 *
 * @param {Function} fn
 * @returns {Function | string}
 */
const logoutMiddleware = (fn) => {
  if (state.routeType === "history" && location.href.includes("#")) {
    state.user = null;
    router.push(route.login.path);
    return LoginPage();
  }

  return fn;
};

export default logoutMiddleware;
