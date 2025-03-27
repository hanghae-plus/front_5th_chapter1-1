import { HashRouter } from "./router/HashRouter.js";
import MainPage from "./pages/MainPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import ErrorPage from "./pages/ErrorPage.js";
import { setupNavLogout } from "./components/Nav.js";

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

window.setupNavLogout = setupNavLogout;

const router = new HashRouter(routes);
window.router = router;
router.start();
