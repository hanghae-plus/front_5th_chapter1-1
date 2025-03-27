import {
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
} from "../components/pages";
import { getUserInfo } from "../utils";
import { setUpLoginEvents } from "../components/pages/LoginPage";
import { setUpProfileEvents } from "../components/pages/ProfilePage";
import { Layout, setUpHeaderEvents } from "../components/common";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
  "/not-found": NotFoundPage,
};

const renderPage = () => {
  let path = location.pathname;

  if (path === "/profile" && !getUserInfo()) {
    path = "/login";
    window.history.replaceState({}, "", path);
  }

  const page = routes[path] || NotFoundPage;

  if (path === "/" || path === "/profile") {
    document.getElementById("root").innerHTML = Layout(page());
    setUpHeaderEvents();

    if (path === "/profile") {
      setUpProfileEvents();
    }
  } else {
    document.getElementById("root").innerHTML = page();

    if (path === "/login") {
      setUpLoginEvents();
    }
  }
};

export const navigateTo = (url) => {
  window.history.pushState({}, "", url);
  renderPage();
};

window.addEventListener("popstate", renderPage);
window.addEventListener("load", renderPage);
window.addEventListener("storage", renderPage);

export default renderPage;
