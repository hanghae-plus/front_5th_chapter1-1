import { BaseRouter } from "./baseRouter.js";

export class HashRouter extends BaseRouter {
  formatPath(path) {
    return path.replace("#", "") || "/";
  }

  getCurrentPath() {
    const path = window.location.hash;
    return this.formatPath(path);
  }

  start() {
    window.addEventListener("DOMContentLoaded", () => {
      this.renderRoute(window.location.hash);
    });
    window.addEventListener("hashchange", () => {
      const path = window.location.hash;
      if (path) this.renderRoute(path);
    });
  }

  navigate(path) {
    window.location.hash = path;
  }
}
