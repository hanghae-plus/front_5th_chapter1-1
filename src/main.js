import { render } from "./helpers/render.js";
import { createRouter } from "./helpers/router.js";
import { routes } from "./routes";

const root = render("#app");

createRouter(root, routes).start();
