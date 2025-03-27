import { BaseRouter } from "./router";

export class BrowserRouter extends BaseRouter {
  constructor() {
    super();
  }

  addEventListener() {
    window.addEventListener("popstate", () => this.checkSafetyAndRender());
  }

  getCurrentPath() {
    const { pathname } = window.location;
    return this.isLocalhost() ? pathname : pathname.replace(this.basePath, "");
  }

  replaceState(pathname) {
    const fullPathname = this.isLocalhost()
      ? pathname
      : `${this.basePath}${pathname}`;
    history.replaceState({}, "", fullPathname);
  }

  pushState(pathname) {
    const fullPathname = this.isLocalhost()
      ? pathname
      : `${this.basePath}${pathname}`;
    history.pushState({}, "", fullPathname);
  }
}
