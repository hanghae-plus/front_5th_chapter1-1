import ErrorPage from "../pages/Error";

import { login, logout, updateUser } from "../store/auth";

class Router {
  static instance = null;

  static getInstance(routes, options) {
    if (!Router.instance) {
      Router.instance = new Router(routes, options);
    }
    return Router.instance;
  }

  constructor(routes, options = { mode: "history", base: "/" }) {
    if (Router.instance) return Router.instance;

    this.routes = routes;
    this.mode = options.mode;
    this.base = options.base;

    Router.instance = this;

    const handleRender = () => {
      this.render();
    };

    if (this.mode === "hash") {
      window.addEventListener("hashchange", handleRender);
    } else {
      window.addEventListener("popstate", handleRender);
    }

    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        this.navigate(e.target.getAttribute("href"));
      }

      if (e.target.matches('[data-action="logout"]')) {
        e.preventDefault();
        logout();
        this.navigate("/login");
      }
    });

    document.addEventListener("submit", (e) => {
      if (e.target.id === "login-form") {
        e.preventDefault();
        const username = document.getElementById("username").value;
        login({ username, email: "", bio: "" });
        this.navigate("/profile");
      }

      if (e.target.id === "profile-form") {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const bio = document.getElementById("bio").value;
        updateUser({ username, email, bio });
      }
    });
  }

  getCurrentPath() {
    // hash 모드 처리
    if (this.mode === "hash") {
      return window.location.hash.slice(1) || "/";
    }

    // GitHub Pages용: 404 redirect 우회 (ex: /?p=/login)
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get("p");
    if (redirectPath?.startsWith("/")) {
      return redirectPath;
    }

    // 로컬 개발환경 등 일반 history 모드
    return window.location.pathname;
  }

  navigate(to) {
    const fullPath = this.base + to.replace(/^\//, "");

    if (this.mode === "hash") {
      window.location.hash = to;
    } else {
      window.history.pushState({}, "", fullPath);
    }

    this.render();
  }

  render() {
    this.currentPath = this.getCurrentPath();

    const page = this.routes[this.currentPath]
      ? this.routes[this.currentPath]()
      : ErrorPage();

    if (page && typeof page === "object" && page.redirect) {
      this.navigate(page.redirect);
      return;
    }

    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = page;
    }
  }
}

export default Router;
