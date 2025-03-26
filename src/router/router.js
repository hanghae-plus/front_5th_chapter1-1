import { routes } from "./routes";

export class BaseRouter {
  constructor() {
    if (new.target === BaseRouter) {
      throw new TypeError("BaseRouter는 상속으로만 사용할 수 있습니다.");
    }
    this.routes = routes;
    this.container = document.body.querySelector("#root");
  }

  getRouteFromPathname(pathname) {
    return this.routes[pathname] || this.routes["default"];
  }

  render(pathname) {
    const route = this.getRouteFromPathname(pathname);
    route.render(this.container);
  }

  getGuardCheckedPath(pathname) {
    const route = this.getRouteFromPathname(pathname);
    if (route.guard && !route.guard()) {
      return route.redirect;
    }
    return pathname;
  }
}
