import { ErrorPage } from "./pages/ErrorPage";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";

const routes = {
  "/": MainPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "/error": ErrorPage,
};

export const Router = {
  Render: () => {
    const root = document.getElementById("root");
    let path;
    if (Router) {
      path = window.location.pathname;
    }
    const Component = routes[path] || routes["/error"];
    root.innerHTML = Component();
  },
};
