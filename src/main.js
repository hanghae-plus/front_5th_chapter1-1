import { render } from "./helpers/render.js";
import { createRouter } from "./helpers/router.js";
import { routes, onBeforeEach } from "./router.js";
import { Context } from "./helpers/context.js";

const root = render("#root");

const router = createRouter(root, routes);

Context.provide("router", router);

router.beforeEach(onBeforeEach).start();
