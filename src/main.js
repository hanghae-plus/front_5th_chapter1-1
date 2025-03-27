import Layout from "./components/Layout.js";

import MainPage from "./pages/main.js";
import ProfilePage from "./pages/profile.js";
import LoginPage from "./pages/login.js";
import ErrorPage from "./pages/error.js";

import HistoryRouter from "./utils/historyRouter.js";
import { setupEventListeners } from "./utils/eventHandlers.js";

const routes = {
  "/": () => Layout(MainPage()),
  "/login": () => LoginPage(),
  "/profile": () => Layout(ProfilePage()),
  "/error": () => ErrorPage(),
};

const router = new HistoryRouter(routes);

setupEventListeners(router);
