import { render } from "./router";
import { addListeners } from "./listeners";

addListeners();
window.addEventListener("popstate", render);
document.addEventListener("DOMContentLoaded", function () {
  render();
});
