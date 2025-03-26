import { BaseRouter } from "./router";

export class BrowserRouter extends BaseRouter {
  constructor() {
    super();
  }

  addEventListener() {
    window.addEventListener("popstate", () => this.render());
  }

  getCurrentPath() {
    return window.location.pathname;
  }

  replaceState(pathname) {
    history.replaceState({}, "", pathname);
  }

  pushState(pathname) {
    history.pushState({}, "", pathname);
  }
}
