import { render } from "./router/router.hash.js";

window.addEventListener("DOMContentLoaded", () => {
  render();
});

window.addEventListener("hashchange", () => {
  render();
});
