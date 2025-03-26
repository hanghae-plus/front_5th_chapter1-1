import { render } from "./router/router.hash.js";
const app = () => {
  window.addEventListener("DOMContentLoaded", render);
  window.addEventListener("hashchange", render);
};

app();
