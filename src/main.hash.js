import { HashRouter } from "./router/HashRouter.js";
import MainPage from "./pages/MainPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import ErrorPage from "./pages/ErrorPage.js";
import { setupNavLogout } from "./components/Nav.js"; // 필요한 경우 추가

const routes = {
  "/": {
    render: MainPage,
    auth: false,
  },
  "/login": {
    render: LoginPage,
    auth: false,
  },
  "/profile": {
    render: ProfilePage,
    auth: true,
  },
  default: {
    render: ErrorPage,
    auth: false,
  },
};

// setupNavLogout을 전역으로 설정 (HashRouter에서 사용하기 위함)
window.setupNavLogout = setupNavLogout;

const router = new HashRouter(routes);
window.router = router;
router.start();
