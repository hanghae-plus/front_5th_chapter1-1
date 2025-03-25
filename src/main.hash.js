import "./main.js";
import { ErrorPage } from "./pages/ErrorPage.js";
import { LoginPage } from "./pages/LoginPage.js";
import { MainPage } from "./pages/MainPage.js";
import { ProfilePage } from "./pages/ProfilePage.js";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
  "/404": ErrorPage,
};
