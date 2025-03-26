import { BaseRouter } from "./router";

export class HashRouter extends BaseRouter {
  constructor(routes) {
    super(routes);
  }

  getHashPath() {
    const hash = window.location.hash || "#/";
    return hash.replace(/^#/, "") || "/";
  }

  render(pathname = this.getHashPath()) {
    super.render(pathname);
  }

  start() {
    super.render();
    window.addEventListener("hashchange", () => this.render());
  }

  navigate(pathname) {
    const hashPath = `#${pathname}`;
    if (window.location.hash !== hashPath) {
      window.location.hash = hashPath;
    }
  }
}
