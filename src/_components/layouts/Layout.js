import { goTo } from "../../_actions/goTo";
import routes, {
  loggedInRoutes,
  loggedOutRoutes,
} from "../../_constants/route";
import states from "../../_states";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";

/**
 * 페이지별 접근 권한 체크
 * @param {string} pathname
 */
const checkRouteAuthorization = (pathname) => {
  const isLoggedIn = states.isLoggedIn;

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

  return null;
};

/**
 * 경로에 따른 페이지 반환
 * @param {string} pathname
 */
const getPage = (pathname) => {
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
  if (states.routeType === "history" && location.href.includes("#")) {
    states.user = null;
    goTo(routes.login.path);
    return LoginPage();
  }

  const pathname = states.pathname;

  const Page = checkRouteAuthorization(pathname);

  if (Page) {
    return Page();
  }

  return getPage(pathname);
};

export default Layout;
