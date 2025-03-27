import Layout from "./components/Layout.js";

import MainPage from "./pages/main.js";
import ProfilePage from "./pages/profile.js";
import LoginPage from "./pages/login.js";
import ErrorPage from "./pages/error.js";

import HashRouter from "./utils/hashRouter.js";
import { setupEventListeners } from "./utils/eventHandlers.js";

const routes = {
  "/": () => Layout(MainPage()),
  "/login": () => LoginPage(),
  "/profile": () => Layout(ProfilePage()),
  "/error": () => ErrorPage(),
};

const hashRouter = new HashRouter(routes);

setupEventListeners(hashRouter);
