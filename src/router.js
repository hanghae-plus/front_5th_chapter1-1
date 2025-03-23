import { initLoginPage, LoginPage, renderLoginPage } from "./pages/login";
import { MainPage } from "./pages/main";
import { NotFoundPage } from "./pages/notFound";
import { ProfilePage } from "./pages/profile";
import { Store } from "./store";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

export function renderRoute() {
  const path = window.location.pathname;
  const Page = routes[path] || NotFoundPage;

  document.body.innerHTML = Page();
  if (path === "/login") {
    initLoginPage();
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      Store.logout();
      history.replaceState(null, "", "/login");
      renderLoginPage();
    });
  }
}

export function navigateTo(path) {
  history.pushState({}, "", path);
  renderRoute();
}
