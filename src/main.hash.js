import { HashRouter, routes } from "./router";

export const router = new HashRouter(routes);
window.router = router;
router.start();
