import { render } from "./helpers/render.js";
import { createHashRouter } from "./helpers/hashRouter.js";
import { createHistoryRouter } from "./helpers/historyRouter.js";
import { routes, onBeforeEach } from "./router.js";
import { Context } from "./helpers/context.js";

const isHashRouter = window.location.href.includes("index.hash.html");

const root = render("#root");
const router = isHashRouter
  ? createHashRouter(root, routes)
  : createHistoryRouter(root, routes);

Context.provide("router", router);

router.beforeEach(onBeforeEach).start();
