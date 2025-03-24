import { render } from "./router/router";

window.addEventListener("popstate", render);
render();
