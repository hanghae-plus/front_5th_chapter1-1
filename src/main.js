import { createRouter } from "./router";
import { HistoryRouter } from "./router/modes";

const root = document.getElementById("root");

const { render } = createRouter({
  root,
  routerMode: HistoryRouter,
});

window.addEventListener("DOMContentLoaded", render);
window.addEventListener("popstate", render);
