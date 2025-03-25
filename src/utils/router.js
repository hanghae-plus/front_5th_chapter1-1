import { renderPage } from "../main.js";

export const navigateTo = (path) => {
  history.pushState(null, "", path);
  renderPage(path);
};
