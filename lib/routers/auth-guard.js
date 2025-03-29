import AuthService from "@lib/services/auth";
import { findRouteByPath } from "@lib/utils";

import { router as routerFactory } from "./router";

import { PATH } from "@lib/configs/path";

/**
 * 미들웨어 형태의 인증 가드
 * @description 유저 인증 상태, 접속 url에 따라 redirect 처리
 */
const authGuard = ({ routes, routerType, renderCallback }) => {
  return () => {
    const router = routerFactory(routerType)(renderCallback);

    const currentPath = router.currentPath;
    let redirectRoute = findRouteByPath(currentPath, routes);

    const isLoggedIn = AuthService.isAuthenticated;

    if (redirectRoute) {
      if (currentPath === PATH.login && isLoggedIn) {
        router.redirectTo(PATH.landing);
        redirectRoute = findRouteByPath(PATH.landing, routes);
      }

      if (
        currentPath !== PATH.landing &&
        currentPath !== PATH.login &&
        !isLoggedIn
      ) {
        router.redirectTo(PATH.login);
        redirectRoute = findRouteByPath(PATH.login, routes);
      }
    }

    renderCallback({ redirectTo: redirectRoute });
  };
};
export default authGuard;
