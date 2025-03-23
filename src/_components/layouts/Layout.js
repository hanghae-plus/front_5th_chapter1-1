import routes from "../../_constants/routes";
import { setUserInfo } from "../../_utils/user";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";

const Layout = () => {
  const pathname = location.pathname;

  // TODO: 예외적으로 처리 아니 왜 로그아웃이 버튼이 아니라 anchor인가요 선생님
  if (location.href.includes("#")) {
    setUserInfo(null);
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
