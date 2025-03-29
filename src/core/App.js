import { MainPage, ProfilePage, LoginPage, ErrorPage } from "../page";
import User from "../store/user";
import getDeployUrl from "./getDeployUrl";
import getRouterMode from "./getRouterMode";

export const App = () => {
  const isHashRouter = getRouterMode() === "hash";
  const path = isHashRouter ? window.location.hash.slice(1) : location.pathname;
  const isLogin = new User().isLogin();
  const DEPLOY_URL = getDeployUrl();

  const routes = {
    [`${DEPLOY_URL}/`]: MainPage(),
    [`${DEPLOY_URL}/profile`]: isLogin ? ProfilePage() : LoginPage(),
    [`${DEPLOY_URL}/login`]: isLogin ? MainPage() : LoginPage(),
  };

  return routes[path] || ErrorPage();
};
