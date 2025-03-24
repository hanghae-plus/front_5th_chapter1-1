import handleRoute from "./router.js";

window.addEventListener("popstate", handleRoute);

document.addEventListener("DOMContentLoaded", () => {
  handleRoute();

  document.body.addEventListener("click", (e) => {
    if (e.target.matches('a[href^="/"]')) {
      e.preventDefault();
      const path = e.target.getAttribute("href");
      window.history.pushState({}, "", path);
      handleRoute();
    }
  });
});
