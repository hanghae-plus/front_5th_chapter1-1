import HistoryRouter from "./HistoryRouter";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import ErrorPage from "./pages/error";
import { keepAuth } from "./services/auth";

const routes = {
  "/": HomePage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  404: ErrorPage,
};

if (!document.getElementById("root")) {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
}

const router = new HistoryRouter(routes);

window.navigateTo = (path) => router.navigateTo(path);
keepAuth();
