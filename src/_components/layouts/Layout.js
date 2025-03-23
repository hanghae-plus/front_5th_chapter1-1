import routes from "../../_constants/routes";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";

const Layout = () => {
  const pathname = location.pathname;

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
