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
  const route = routes[currentPath];

  if (!route) {
    document.body.innerHTML = ErrorPage();
    return;
  }

  if (currentPath === "/profile" && !state.isLoggedIn) {
    window.history.pushState({}, "", "/login");
    render();
    return;
  }

  document.body.innerHTML = "";
  document.body.appendChild(routes[currentPath]?.() || ErrorPage());
};

window.addEventListener("popstate", render);
