import { handleRoute, navigateTo } from "./router/router.js";

window.addEventListener("popstate", handleRoute);

document.addEventListener("DOMContentLoaded", handleRoute);

document.body.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="/"]')) {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    navigateTo(path);
  }
  if (e.target && e.target.id === "logout") {
    navigateTo("/login");
  }
});

document.body.addEventListener("submit", (e) => {
  if (e.target.matches('form[id="login-form"]')) {
    navigateTo("/");
  }
});
