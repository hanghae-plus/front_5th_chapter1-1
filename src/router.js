import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

const routes = {
  "/": MainPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "*": NotFoundPage,
};

export function render() {
  const path = window.location.pathname;
  const component = routes[path] || routes["*"];
  const $app = document.querySelector("#root");
  $app.innerHTML = component();
}

export function onClikcLink(e) {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
  }
  navigate(e.target.href);
}

export function navigate(path) {
  window.history.pushState({}, "", path);
  render();
}

export function initRouter() {
  window.addEventListener("popstate", render);

  document.addEventListener("DOMContentLoaded", () => {
    render();
    document.body.addEventListener("click", onClikcLink);
  });
}
