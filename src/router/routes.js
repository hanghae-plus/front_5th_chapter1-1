import MainPage from "../pages/Main";
import ProfilePage from "../pages/Profile";
import LoginPage from "../pages/Login";
import AuthAPI from "../interfaces/auth.interface";
import { BASE_PATH } from "../consts/path";

const routes = {
  [BASE_PATH]: MainPage,
  [BASE_PATH + "profile"]: () => {
    if (!AuthAPI.isLoggedIn()) {
      return { redirect: BASE_PATH + "login" };
    }
    return ProfilePage();
  },
  [BASE_PATH + "login"]: () => {
    if (AuthAPI.isLoggedIn()) {
      return { redirect: BASE_PATH };
    }
    return LoginPage();
  },
};

export default routes;
