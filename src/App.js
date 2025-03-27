import { MainPage } from "./pages/MainPage.js";
import { LoginPage } from "./pages/LoginPage.js";
import { ProfilePage } from "./pages/ProfilePage.js";
import { ErrorPage } from "./pages/ErrorPage.js";
import { customRouterUtils, routerConfig } from "./utils/routerUtils.js";
import { userUtils } from "./utils/userUtils.js";

const getPage = (path) => {
  console.log({
    path,
  });
  if (path === "/") {
    return MainPage();
  }

  if (path === "/login") {
    if (userUtils.isLoggedIn()) {
      customRouterUtils.navigationTo("/");
      return MainPage();
    }

    return LoginPage();
    // return customRouterUtils.RouterGuard({
    //   path: "/login",
    //   component: LoginPage(),
    //   redirectComponent: MainPage(),
    // });
  }

  if (path === "/profile") {
    if (!userUtils.isLoggedIn()) {
      customRouterUtils.navigationTo("/login");
      return LoginPage();
    }

    return ProfilePage();
    // return customRouterUtils.RouterGuard({
    //   path: "/profile",
    //   component: ProfilePage(),
    //   redirectComponent: LoginPage(),
    // });
  }

  return ErrorPage();
};

const render = () => {
  if (routerConfig.getRouterType() === "hash" && !window.location.hash) {
    window.location.hash = "#/";
  }

  const path = customRouterUtils.getCurrentPath();
  document.getElementById("root").innerHTML = getPage(path);
};

export default render;
