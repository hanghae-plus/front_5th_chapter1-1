import { render } from "./helpers/render.js";
import { createRouter } from "./core/router";
import { routes, onBeforeEach } from "./router.js";
import { provide } from "./core/context";

const root = render("#root");
const router = createRouter(root, routes, { mode: "history" });

provide("router", router);
router.beforeEach(onBeforeEach).start();
