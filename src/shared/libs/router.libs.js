class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
    window.addEventListener("hashchange", this.handleHashChange.bind(this));
    this.isHashMode = window.location.pathname.includes("hash.html");
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    if (this.isHashMode) {
      window.location.hash = "#" + path;
    } else {
      history.pushState(null, "", path);
      this.handleRoute(path);
    }
  }

  handlePopState() {
    if (!this.isHashMode) {
      this.handleRoute(window.location.pathname);
    }
  }

  handleHashChange() {
    if (this.isHashMode) {
      const path = window.location.hash.substring(1) || "/";
      this.handleRoute(path);
    }
  }

  handleRoute(path) {
    // * 배포 후 라우팅 처리
    const base = "/front_5th_chapter1-1";
    if (path.startsWith(base)) {
      path = path.slice(base.length);
    }
    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    const handler = this.routes[path] || this.routes["*"];
    handler?.();
  }
}

// ? singleton pattern을 위한 export
export const router = new Router();
