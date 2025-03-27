import HomePage from "../pages/home.js";
import ProfilePage from "../pages/profile.js";
import LoginPage from "../pages/login.js";
import ErrorPage from "../pages/error.js";
import Layout from "../components/layout.js";

export const routes = {
  "/": () => Layout(HomePage()),
  "/profile": () => Layout(ProfilePage()),
  "/login": LoginPage,
  "*": ErrorPage,
};
