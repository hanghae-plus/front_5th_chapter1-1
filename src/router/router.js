import ErrorPage from "../pages/Error";

import { eventService } from "../services/event.service";

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
      eventService.handleNavigation(e);
      eventService.handleAuth(e);
    });

    document.addEventListener("submit", (e) => {
      eventService.handleFormSubmit(e);
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
