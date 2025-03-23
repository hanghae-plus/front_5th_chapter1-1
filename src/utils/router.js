import MainPage from "../components/MainPage.jsx";
import ProfilePage from "../components/ProfilePage.jsx";
import LoginPage from "../components/LoginPage.jsx";
import NotFoundPage from "../components/NotFoundPage.jsx";

const routes = {
  "/": MainPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "*": NotFoundPage,
};

const Render = () => {
  const root = document.getElementById("root");
  const path = window.location.pathname;
  const Component = routes[path] || routes["*"];
  root.innerHTML = Component();
};

export { Render };
