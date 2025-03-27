import MainPage from "../pages/MainPage.js";
import NotFoundPage from "../pages/NotFoundPage.js";
import LoginPage from "../pages/LoginPage.js";
import ProfilePage from "../pages/ProfilePage.js";
import { store } from "../store/store.js";

export const navigateTo = (path) => {
  history.pushState(null, "", path);
  render();
};

export const App = () => {
  const path = location.pathname;
  if (path === "/login") return LoginPage();
  if (path === "/profile") {
    if (!store.isLoggedIn) {
      navigateTo("/login");
      return LoginPage();
    }
    return ProfilePage();
  }
  if (path === "/") return MainPage();
  return NotFoundPage();
};

const init = () => {
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }
  return root;
};

export const render = () => {
  const root = init();
  root.innerHTML = App();
};
