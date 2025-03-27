import LoginPage from "./pages/loginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/profilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { Header, Footer } from "./componentes/layout";
import { state } from "./store";

export const isProd = location.hostname.includes("github.io");
export const BASE_PATH = isProd ? "/front_5th_chapter1-1" : "";

export const matchedPath = (path) => {
  const currentPath = window.location.hash
    ? window.location.hash.slice(1) || "/"
    : window.location.pathname.replace(BASE_PATH, "") || "/";
  return currentPath === path;
};

export const routes = {
  "/login": LoginPage,
  "/profile": ProfilePage,
  "/": HomePage,
  "*": NotFoundPage,
};

const root = document.getElementById("root");

export const router = () => {
  const path = window.location.pathname.replace(BASE_PATH, "") || "/";
  if (path === "/") {
    return (root.innerHTML = HomePage());
  }
  if (path === "/profile") {
    if (!state.loginState) {
      navigate("/login");
      return (root.innerHTML = LoginPage());
    }

    return (root.innerHTML = ProfilePage({ Header, Footer }));
  }
  if (path === "/login") {
    if (state.loginState) {
      return (root.innerHTML = HomePage());
    }
    navigate("/");
    return (root.innerHTML = LoginPage());
  }
  return (root.innerHTML = NotFoundPage());
};

export const navigate = (path) => {
  history.pushState({}, "", path);
  //   history.pushState({}, "", `${BASE_PATH}${path}`);
  router();
};
