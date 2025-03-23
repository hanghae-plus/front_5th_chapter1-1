import { goTo } from "../../_actions/goTo";
import routes from "../../_constants/routes";
import { getUserInfo, removeUserInfo } from "../../_utils/user";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";

const Layout = () => {
  const pathname = location.pathname;

  // TODO: 예외적으로 처리 아니 왜 로그아웃이 버튼이 아니라 anchor인가요 선생님
  if (location.href.includes("#")) {
    removeUserInfo();
    goTo(routes.login.path);
    return LoginPage();
  }

  const userInfo = getUserInfo();
  const isLoggedIn = !!userInfo;

  // 로그인 가능한 라우트와 로그아웃 가능한 라우트를 분리
  const routesList = Object.entries(routes).map(([key, route]) => {
    return {
      ...route,
      id: key,
    };
  });
  const isLoggedInRoutes = routesList.filter(
    (route) => route.accessLevel === "loggedIn",
  );
  const isLoggedOutRoutes = routesList.filter(
    (route) => route.accessLevel === "loggedOut",
  );

  // 비로그인 상태에서 로그인 상태에서 접근 가능한 경로로 접근한 경우
  if (
    isLoggedInRoutes.some((route) => route.path === pathname) &&
    !isLoggedIn
  ) {
    goTo(routes.login.path);
    return LoginPage();
  }
  // 로그인 상태에서 로그아웃 상태에서 접근 가능한 경로로 접근한 경우
  if (
    isLoggedOutRoutes.some((route) => route.path === pathname) &&
    isLoggedIn
  ) {
    goTo(routes.home.path);
    return MainPage();
  }

  const getPage = () => {
    switch (pathname) {
      case routes.home.path:
        return MainPage();
      case routes.login.path:
        return LoginPage();
      case routes.profile.path:
        return ProfilePage();
      default:
        return NotFoundPage();
    }
  };

  return getPage();
};

export default Layout;
