import HomePage from "./pages/home.js";
import ProfilePage from "./pages/profile.js";
import LoginPage from "./pages/login.js";
import ErrorPage from "./pages/error.js";
import Layout from "./components/layout.js";
import store from "./store/store.js";
import { BASE_PATH } from "./config.js";

const routes = {
  "/": () => Layout(HomePage()),
  "/profile": () => Layout(ProfilePage()),
  "/login": LoginPage,
  "*": ErrorPage,
};

const handleRoute = () => {
  const path = window.location.pathname.replace(BASE_PATH, "") || "/";
  const app = document.querySelector("#root");

  if (path === "/login" && store.state.loggedIn) {
    window.history.pushState({}, "", BASE_PATH + "/");
    app.innerHTML = Layout(HomePage());
    return;
  }

  if (path === "/profile" && !store.state.loggedIn) {
    window.history.pushState({}, "", BASE_PATH + "/login");
    app.innerHTML = LoginPage();
    return;
  }

  const component = routes[path] || routes["*"];
  app.innerHTML = component();
};

// 페이지 이동을 위한 유틸리티 함수
export const navigateTo = (path) => {
  window.history.pushState({}, "", `${BASE_PATH}${path}`);
  handleRoute();
};

export default handleRoute;
