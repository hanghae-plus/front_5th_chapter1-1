import { Router, goTo } from "./router";

document.addEventListener("DOMContentLoaded", () => {
  Router();
});

window.addEventListener("popstate", () => {
  Router();
});

document.body.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const url = event.target.getAttribute("href");
    // window.history.pushState({}, "", url);
    // Router();
    goTo(url);
  }
});
