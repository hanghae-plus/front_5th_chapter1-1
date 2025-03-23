import { render } from "./helpers/render.js";
import { createRouter } from "./core/router";
import { routes, onBeforeEach } from "./router.js";
import { Context } from "./helpers/context.js";

const root = render("#root");
const router = createRouter(root, routes, { mode: "hash" });

Context.provide("router", router);
router.beforeEach(onBeforeEach).start();
