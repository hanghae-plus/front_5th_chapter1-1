import { goTo } from "../../_actions/goTo";
import routes, {
  loggedInRoutes,
  loggedOutRoutes,
} from "../../_constants/route";
import { getUserInfo, removeUserInfo } from "../../_utils/user";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";

/** 페이지별 접근 권한 체크 */
const checkRouteAuthorization = () => {
  const pathname = location.pathname;
  const userInfo = getUserInfo();
  const isLoggedIn = !!userInfo;

  // 비로그인 상태에서 로그인 상태에서 접근 가능한 경로로 접근한 경우
  if (loggedInRoutes.some((route) => route.path === pathname) && !isLoggedIn) {
    goTo(routes.login.path);
    return LoginPage;
  }
  // 로그인 상태에서 로그아웃 상태에서 접근 가능한 경로로 접근한 경우
  if (loggedOutRoutes.some((route) => route.path === pathname) && isLoggedIn) {
    goTo(routes.home.path);
    return MainPage;
  }
};

/** 경로에 따른 페이지 반환 */
const getPage = () => {
  const pathname = location.pathname;

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

const Layout = () => {
  // TODO: 예외적으로 처리 아니 왜 로그아웃이 버튼이 아니라 anchor인가요 선생님
  if (location.href.includes("#")) {
    removeUserInfo();
    goTo(routes.login.path);
    return LoginPage();
  }

  const page = checkRouteAuthorization();

  if (page) {
    return page;
  }

  return getPage();
};

export default Layout;
