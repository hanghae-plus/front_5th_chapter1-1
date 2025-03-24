class Router {
  constructor() {
    this.routes = {};
    this.basePath = this.getBasePath();
    window.addEventListener("popstate", this.handlePopState.bind(this));
    window.addEventListener("hashchange", this.handleHashChange.bind(this));
  }

  getBasePath() {
    //
    return window.location.hostname.includes("github.io")
      ? "/front_5th_chapter1-1"
      : "";
  }

  get isHashMode() {
    return (
      window.location.pathname.includes("index.hash.html") ||
      window.location.hash !== ""
    );
  }

  addRoute(path, handler) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    this.routes[normalizedPath] = handler;
  }

  navigateTo(path) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    if (this.isHashMode) {
      window.location.hash = normalizedPath;
      const routePath = normalizedPath || "/";
      this.handleRoute(routePath);
    } else {
      const fullPath = `${this.basePath}${normalizedPath}`;
      history.pushState(null, "", fullPath);
      this.handleRoute(normalizedPath);
    }
  }

  handlePopState() {
    if (!this.isHashMode) {
      const path = window.location.pathname.replace(this.basePath, "") || "/";
      this.handleRoute(path);
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

    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    let routePath = normalizedPath;
    if (routePath.startsWith(this.basePath)) {
      routePath = routePath.replace(this.basePath, "") || "/";
    }

    if (routePath === "") routePath = "/";

    const handler = this.routes[routePath] || this.routes["*"];

    if (handler) {
      handler();
    }
  }
}

// ? singleton pattern을 위한 export
export const router = new Router();
