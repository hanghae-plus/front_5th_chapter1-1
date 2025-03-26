import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage";
import { state } from "./state";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

export const render = () => {
  const currentPath = window.location.pathname;

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

  if (currentPath === "/profile" && !state.isLoggedIn) {
    window.history.pushState({}, "", "/login");
    render();
    return;
  }

  root.innerHTML = "";
  root.appendChild(routes[currentPath]?.() || ErrorPage());
};

window.addEventListener("popstate", render);
