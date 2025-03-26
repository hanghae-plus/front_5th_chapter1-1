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
    const defaultPathname = pathname || this.getCurrentPath();
    const route = this.getRouteFromPathname(defaultPathname);
    route.render(this.container);
  }

  getGuardCheckedPath(pathname) {
    const route = this.getRouteFromPathname(pathname);
    if (route.guard && !route.guard()) {
      return route.redirect;
    }
    return pathname;
  }

  start() {
    this.addEventListener();

    const currentPath = this.getCurrentPath();
    const safePathname = this.getGuardCheckedPath(currentPath);

    if (currentPath !== safePathname) {
      this.replaceState(safePathname);
    }

    this.render(safePathname);
  }

  navigate(pathname) {
    const currentPath = this.getCurrentPath();
    if (pathname === currentPath) return;

    const safePathname = this.getGuardCheckedPath(pathname);
    if (safePathname === currentPath) return;

    this.pushState(safePathname);
    this.render(safePathname);
  }

  // 아래는 자식 class에서 구현해야 함

  addEventListener() {
    throw new Error("addEventListener를 subclass에서 구현해야 합니다.");
  }

  getCurrentPath() {
    throw new Error("getCurrentPath를 subclass에서 구현해야 합니다.");
  }

  replaceState() {
    throw new Error("replaceState를 subclass에서 구현해야 합니다.");
  }

  pushState() {
    throw new Error("pushState를 subclass에서 구현해야 합니다.");
  }
}
