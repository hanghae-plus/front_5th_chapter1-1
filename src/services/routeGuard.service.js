import { AuthAPI } from "../interfaces/auth.interface";
import { BASE_PATH } from "../consts/path";

export const routeGuardService = {
  checkProfileAccess() {
    if (!AuthAPI.isLoggedIn()) {
      return { redirect: BASE_PATH + "login" };
    }
    return null;
  },

  checkLoginAccess() {
    if (AuthAPI.isLoggedIn()) {
      return { redirect: BASE_PATH };
    }
    return null;
  },
};
