import { ErrorPage } from "../../pages/ErrorPage";

import { moveToPage } from "./moveToPage";
import { userAction } from "../../store/action/userAction";
import { routerState } from "../routerManager";
import { routerAddEvent } from "./routerAddEvent";

export const routerRender = () => {
  const root = document.getElementById("root");
  const route = routerState.getRoute();
  const isLogin = userAction.checkIsLoginStatus();
  const pathname =
    routerState.mode === "history"
      ? window.location.pathname
      : window.location.hash || "#/";

  if (
    (pathname === "#/profile" || pathname.split("/").pop() === "profile") &&
    !isLogin
  ) {
    return moveToPage("/login");
  }
  if (
    (pathname === "#/login" || pathname.split("/").pop() === "login") &&
    isLogin
  ) {
    return moveToPage("/");
  }

  const page = route[pathname] || ErrorPage;
  root.innerHTML = page();

  if (!routerState.isEventAttached) {
    routerState.isEventAttached = true;
    return routerAddEvent(root);
  }
};

window.addEventListener("popstate", routerRender);
window.addEventListener("hashchange", routerRender);
