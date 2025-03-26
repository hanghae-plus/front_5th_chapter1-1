import { HistoryRouter } from "./router/historyRouter";

const router = new HistoryRouter();
window.navigate = router.navigate;

window.addEventListener("popstate", () => router.render());
router.render();
