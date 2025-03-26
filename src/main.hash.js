import { HashRouter } from "./router/hashRouter";

const router = new HashRouter();
window.navigate = router.navigate;

window.addEventListener("hashchange", () => router.render());
router.render();
