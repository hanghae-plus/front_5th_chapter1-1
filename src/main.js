import { Router, routes } from "./router";

export const router = new Router(routes);
window.router = router;
router.start();
