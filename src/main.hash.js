import { render } from "./router/router.hash";

window.addEventListener("DOMContentLoaded", render);
window.addEventListener("hashchange", render);
