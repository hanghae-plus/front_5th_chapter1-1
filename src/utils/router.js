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

export const Router = {
  RouterType: "basic",
  Render: () => {
    const root = document.getElementById("root");
    let path;
    if (Router.RouterType === "basic") {
      path = window.location.pathname;
    } else if (Router.RouterType === "hash") {
      path = window.location.hash.slice(1);
    }
    const Component = routes[path] || routes["*"];
    root.innerHTML = Component();
  },
};
