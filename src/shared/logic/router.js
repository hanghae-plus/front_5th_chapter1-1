import { renderPage } from "../../main.js";

export function goTo(path) {
  window.history.pushState({}, "", path);
  renderPage();
}
