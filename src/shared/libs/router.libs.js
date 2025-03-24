import { config } from "../config";

class Router {
  constructor() {
    this.routes = {};
    this.basePath = config.basePath;
    window.addEventListener("popstate", this.handlePopState.bind(this));
    window.addEventListener("hashchange", this.handleHashChange.bind(this));
  }

  get isHashMode() {
    return (
      window.location.pathname.includes("index.hash.html") ||
      window.location.hash !== ""
    );
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    if (this.isHashMode) {
      window.location.hash = path;
      const routePath = path || "/";
      this.handleRoute(routePath);
    } else {
      history.pushState(null, "", `${this.basePath}${path}`);
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
    if (!document.getElementById("root")) {
      const root = document.createElement("div");
      root.id = "root";
      document.body.appendChild(root);
    }

    let normalizedPath = path;

    if (path.startsWith(this.basePath)) {
      normalizedPath = path.replace(this.basePath, "") || "/";
    }

    if (normalizedPath === "") normalizedPath = "/";

    const handler = this.routes[normalizedPath] || this.routes["*"];

    if (handler) {
      handler();
    }
  }
}

// ? singleton pattern을 위한 export
export const router = new Router();
