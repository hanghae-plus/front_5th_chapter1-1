import { MainPage } from "./main";
import { ErrorPage } from "./pages/error";
import { LoginPage } from "./pages/login";
import { ProfilePage } from "./pages/profile";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

export function renderRoute() {
  const path = window.location.pathname;
  const Page = routes[path] || ErrorPage;

  document.body.innerHTML = Page();
}

export function navigateTo(path) {
  history.pushState({}, "", path);
  renderRoute();
}
