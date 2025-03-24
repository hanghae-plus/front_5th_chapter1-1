import { mount } from "./core/render";
import { createRouter } from "./core/router";
import { routes, onBeforeEach } from "./router.js";
import { provide } from "./core/context";

const root = mount("#root");
const router = createRouter(root, routes, { mode: "hash" });

provide("router", router);
router.beforeEach(onBeforeEach).start();
