import { HomePage } from "./pages/HomePage.js";
import { ProfilePage } from "./pages/ProfilePage.js";
import { LoginPage } from "./pages/LoginPage.js";
import { NotFoundPage } from "./pages/NotFoundPage.js";

export const routes = {
  "/": HomePage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "/404": NotFoundPage,
};
