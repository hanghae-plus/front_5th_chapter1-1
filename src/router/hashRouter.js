import { BaseRouter } from "./router";

export class HashRouter extends BaseRouter {
  constructor() {
    super();
  }

  addEventListener() {
    window.addEventListener("hashchange", () => this.checkSafetyAndRender());
  }

  getCurrentPath() {
    const hash = window.location.hash || "#/";
    return hash.replace(/^#/, "") || "/";
  }

  replaceState(pathname) {
    window.location.hash = `#${pathname}`;
  }

  pushState(pathname) {
    window.location.hash = `#${pathname}`;
  }
}
