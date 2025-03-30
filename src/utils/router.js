import { NotFound } from "../components/NotFound";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import { getLocalStorage, removeLocalStorage } from "./storage";

export const Router = {
  routes: {
    "/": HomePage,
    "/login": LoginPage,
    "/profile": ProfilePage,
  },

  init({ onClick, onSubmit }) {
    addEventListener("click", onClick);
    addEventListener("submit", onSubmit);
    addEventListener("popstate", this.render.bind(this));
    addEventListener("hashchange", this.render.bind(this));

    this.render();
  },

  routeGuard() {
    const auth = this.getAuth();
    const currentPath = this.getCurrentPath();

    const isUnAuthorized = !auth && currentPath.includes("profile");
    if (isUnAuthorized) {
      return this.navigate("/login");
    }

    const isAlreadyLoggedIn = auth && currentPath.includes("login");
    if (isAlreadyLoggedIn) {
      return this.navigate("/");
    }

    return true;
  },

  getComponent(path) {
    const isPage = this.routes[path];
    const isLoginPage = path.includes("login");
    if (!isPage || isLoginPage) {
      return (this.routes[path] || NotFound)();
    }

    return RootLayout({ children: this.routes[path]() });
  },

  render() {
    const isRouteGuardPassed = this.routeGuard();
    if (!isRouteGuardPassed) return;

    const currentPath = this.removeBasePath(this.getCurrentPath());
    const page = this.getComponent(currentPath);

    document.body.innerHTML = `<div id="root">${page}</div>`;
  },

  navigate(path, isHashRouter = path?.startsWith("#")) {
    let finalPath = path;

    if (isHashRouter) {
      location.hash = finalPath;
    } else {
      const basePath = this.getBasePath()?.replace(/\/$/, "");
      const hasBashPath = path.includes(basePath);
      if (!hasBashPath) {
        finalPath = basePath + path;
      }

      history.pushState(null, "", finalPath);
    }

    this.render();
  },

  // TODO: Auth 처리 로직 빼기
  getAuth() {
    return getLocalStorage("user");
  },

  clearAuth() {
    return removeLocalStorage("user");
  },

  getBasePath() {
    return import.meta.env.VITE_BASE_PATH || "/";
  },

  removeBasePath(path) {
    return path?.replace(this.getBasePath(), "/");
  },

  getCurrentPath() {
    const isHashRouter = location.hash;
    if (isHashRouter) {
      return this.removeBasePath(location.hash?.slice(1));
    }

    return this.removeBasePath(location.pathname);
  },
};
