import { BrowserRouter, routes } from "./router";

export const router = new BrowserRouter(routes);
window.router = router;
router.start();
