import route from "../../_constants/route";
import state from "../../_libs/state";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";

const Layout = () => {
  switch (state.pathname) {
    case route.home.path + "/":
    case route.home.path:
      return MainPage();
    case route.login.path:
      return LoginPage();
    case route.profile.path:
      return ProfilePage();
    default:
      return NotFoundPage();
  }
};

export default Layout;
