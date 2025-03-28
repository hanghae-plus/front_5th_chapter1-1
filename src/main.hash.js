import { createRouter } from "./router";
import { HashRouter } from "./router/modes";

const root = document.getElementById("root");

const { render } = createRouter({
    root,
    routerMode: HashRouter,
});

window.addEventListener("DOMContentLoaded", render);
window.addEventListener("hashchange", render);
