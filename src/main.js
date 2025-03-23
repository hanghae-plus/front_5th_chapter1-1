import { render } from "./helpers/render.js";
import { createRouter } from "./helpers/router.js";
import { routes, onBeforeEach } from "./router.js";

const root = render("#app");

const router = createRouter(root, routes);
router.beforeEach(onBeforeEach).start();
