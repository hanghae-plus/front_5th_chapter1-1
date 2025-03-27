import { MainPage } from "./pages/MainPage.js";
import { LoginPage } from "./pages/LoginPage.js";
import { ProfilePage } from "./pages/ProfilePage.js";
import { ErrorPage } from "./pages/ErrorPage.js";
import { state } from "./state.js";

const isProduction = import.meta.env.MODE === "production";
const BASE = isProduction ? "/front_5th_chapter1-1" : "";

const routes = {
  [`${BASE}/`]: MainPage,
  [`${BASE}/login`]: LoginPage,
  [`${BASE}/profile`]: ProfilePage,
};

export const render = (hash) => {
  const isHistoryRouter =
    typeof hash === "undefined" || typeof hash === "object";
  const currentPath = isHistoryRouter
    ? window.location.pathname
    : hash?.toString().slice(1);

  const root = document.body.querySelector("#root");
  if (!root) {
    console.error("Root not found");
    return;
  }

  const route = routes[currentPath];
  if (!route) {
    root.innerHTML = ErrorPage();
    return;
  }

  if (currentPath === "/login" && state.isLoggedIn) {
    if (isHistoryRouter) {
      window.history.pushState({}, "", "/");
      render();
    } else {
      window.location.hash = "#/";
      render("#/");
    }
    return;
  }

  if (currentPath === "/profile" && !state.isLoggedIn) {
    if (isHistoryRouter) {
      window.history.pushState({}, "", "/login");
      render();
    } else {
      window.location.hash = "#/login";
      render("#/login");
    }
    return;
  }

  root.innerHTML = "";
  root.appendChild(route?.(isHistoryRouter) || ErrorPage());
};

window.addEventListener("popstate", render);
