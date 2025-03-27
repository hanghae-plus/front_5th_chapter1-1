import { MainPage, ProfilePage, LoginPage, ErrorPage } from "../page";
import User from "../store/user";
import { getDeployUrl } from "./getDeployUrl";
import getRouterMode from "./getRouterMode";

export const App = () => {
  let isHashRouter = getRouterMode() === "hash";
  let path = isHashRouter ? window.location.hash.slice(1) : location.pathname;
  let isLogin = new User().isLogin();
  const DEPLOY_URL = getDeployUrl();

  if (path === `${DEPLOY_URL}/`) return MainPage();
  if (path === `${DEPLOY_URL}/profile`) {
    return isLogin ? ProfilePage() : LoginPage();
  }
  if (path === `${DEPLOY_URL}/login`) {
    return isLogin ? MainPage() : LoginPage();
  }
  return ErrorPage();
};
