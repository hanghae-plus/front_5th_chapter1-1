import { ROUTE } from "./constants.js";

export const createAuthGuard = (userModel, router) => () => {
  if (!userModel.userInfo?.username) {
    router.navigate(ROUTE.login);
    return false;
  }
  return true;
};

export const createGuestGuard = (userModel, router) => () => {
  if (userModel.userInfo?.username) {
    router.navigate(ROUTE.main);
    return false;
  }
  return true;
};
