import { BaseRouter } from "./baseRouter.js";

export class HashRouter extends BaseRouter {
  formatPath(path) {
    return path.replace("#", "") || "/";
  }

  start() {
    window.addEventListener("hashchange", () =>
      this.renderRoute(window.location.hash),
    );
    this.renderRoute(window.location.hash);
  }

  navigate(path) {
    window.location.hash = path;
  }
}
