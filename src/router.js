import { LoginPage } from "./pages/login";
import { MainPage } from "./pages/main";
import { NotFoundPage } from "./pages/notFound";
import { ProfilePage } from "./pages/profile";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

export function renderRoute() {
  const path = window.location.pathname;
  const Page = routes[path] || NotFoundPage;

  document.body.innerHTML = Page();
}

export function navigateTo(path) {
  history.pushState({}, "", path);
  renderRoute();
}
