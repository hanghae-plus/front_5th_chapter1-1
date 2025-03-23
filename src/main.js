import { render } from "./helpers/render.js";
import { createRouter } from "./core/router";
import { routes, onBeforeEach } from "./router.js";
import { Context } from "./helpers/context.js";

export default function main({ mode = "history" } = {}) {
  const root = render("#root");
  const router = createRouter(root, routes, { mode });

  Context.provide("router", router);
  router.beforeEach(onBeforeEach).start();
}

main();
