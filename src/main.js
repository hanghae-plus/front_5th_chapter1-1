import { Router } from "./router/Router";
import MainPage from "./pages/MainPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import ErrorPage from "./pages/ErrorPage.js";

const isProduction = import.meta.env.MODE === "production";
const BASE_ROUTE = isProduction ? "/front_5th_chapter1-1" : "";

const routes = {
  [`${BASE_ROUTE}/`]: { render: MainPage },
  [`${BASE_ROUTE}/login`]: { render: LoginPage },
  [`${BASE_ROUTE}/profile`]: { render: ProfilePage },
  default: { render: ErrorPage },
};

const router = new Router(routes);

window.router = router;
window.BASE_ROUTE = BASE_ROUTE;

router.start();
