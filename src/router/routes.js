import MainPage from "../pages/Main";
import ProfilePage from "../pages/Profile";
import LoginPage from "../pages/Login";
import { BASE_PATH } from "../consts/path";
import { routeGuardService } from "../services/routeGuard.service";

const routes = {
  [BASE_PATH]: MainPage,
  [BASE_PATH + "profile"]: () => {
    const guard = routeGuardService.checkProfileAccess();
    if (guard) return guard;
    return ProfilePage();
  },
  [BASE_PATH + "login"]: () => {
    const guard = routeGuardService.checkLoginAccess();
    if (guard) return guard;
    return LoginPage();
  },
};
export default routes;
