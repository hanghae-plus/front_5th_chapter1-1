import MainPage from "../pages/Main";
import ProfilePage from "../pages/Profile";
import LoginPage from "../pages/Login";
import { isLoggedIn } from "../store/Auth";

const routes = {
  "/": MainPage,
  "/profile": () => {
    if (!isLoggedIn()) {
      return LoginPage();
    }
    return ProfilePage();
  },
  "/login": LoginPage,
};

export default routes;
