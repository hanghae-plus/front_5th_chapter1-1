import MainPage from "../pages/Main";
import ProfilePage from "../pages/Profile";
import LoginPage from "../pages/Login";
import { isLoggedIn } from "../store/auth";

const routes = {
  "/": MainPage,
  "/profile": () => {
    if (!isLoggedIn()) {
      return { redirect: "/login" };
    }
    return ProfilePage();
  },
  "/login": () => {
    if (isLoggedIn()) {
      return { redirect: "/" };
    }
    return LoginPage();
  },
};

export default routes;
