import MainPage from "../pages/Main";
import ProfilePage from "../pages/Profile";
import LoginPage from "../pages/Login";
import { isLoggedIn } from "../store/auth";
import { BASE_PATH } from "../consts/path";

const routes = {
  [BASE_PATH]: MainPage,
  [BASE_PATH + "profile"]: () => {
    if (!isLoggedIn()) {
      return { redirect: BASE_PATH + "login" };
    }
    return ProfilePage();
  },
  [BASE_PATH + "login"]: () => {
    if (isLoggedIn()) {
      return { redirect: BASE_PATH };
    }
    return LoginPage();
  },
};

export default routes;
