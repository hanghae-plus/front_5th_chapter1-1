import { Router } from "./router/Router";
import MainPage from "./pages/MainPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import ErrorPage from "./pages/ErrorPage.js";

const router = new Router({
  "/": { render: MainPage },
  "/login": { render: LoginPage },
  "/profile": { render: ProfilePage },
  default: { render: ErrorPage },
});

window.router = router;
router.start();
