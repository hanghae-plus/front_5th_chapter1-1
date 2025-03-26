import { HashRouter } from "./router/hashRouter";

const router = new HashRouter();
window.navigate = router.navigate;

router.render();
