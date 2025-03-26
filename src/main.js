import { HistoryRouter } from "./router/historyRouter";

const router = new HistoryRouter();
window.navigate = router.navigate;

router.render();
