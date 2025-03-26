import { BaseRouter } from "./router";

export class BrowserRouter extends BaseRouter {
  constructor(routes) {
    super(routes);
  }

  render(pathname = window.location.pathname) {
    super.render(pathname);
  }

  start() {
    super.start();
    window.addEventListener("popstate", () => this.render());
  }

  navigate(pathname) {
    if (pathname !== window.location.pathname) {
      history.pushState({}, "", pathname);
      this.render(pathname);
    }
  }
}
