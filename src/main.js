import renderPage, { navigateTo } from "./app/router";

document.addEventListener("DOMContentLoaded", () => {
  renderPage();

  document.body.addEventListener("click", (event) => {
    const target = event.target;

    if (target.matches("[data-link]")) {
      event.preventDefault();
      const url = target.dataset.link;
      navigateTo(url);
    }
  });
});
