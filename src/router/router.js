import { CONST } from "../data/constants";
import { routes } from "./routes";

const BASE_PATH =
  location.hostname === CONST.localhost ? CONST.blankPath : CONST.deployPath;

export class BaseRouter {
  constructor() {
    if (new.target === BaseRouter) {
      throw new TypeError("BaseRouter는 상속으로만 사용할 수 있습니다.");
    }
    this.routes = routes;
    this.container = document.body.querySelector("#root");
    this.basePath = BASE_PATH;
  }

  isLocalhost() {
    return location.hostname === CONST.localhost;
  }

  getGuardCheckedPath(pathname) {
    const route = this.getRouteFromPathname(pathname);
    if (route.guard && !route.guard()) {
      return route.redirect;
    }
    return pathname;
  }

  getRouteFromPathname(pathname) {
    return this.routes[pathname] || this.routes["default"];
  }

  start() {
    this.addEventListener();
    this.checkSafetyAndRender();
  }

  // 렌더링만 담당하도록 분할
  render(pathname) {
    const route = this.getRouteFromPathname(pathname);
    this.container.innerHTML = route.page.template();
    route.page.onMount();
  }

  checkSafetyAndRender() {
    const currentPathname = this.getCurrentPath();
    const safePathname = this.getGuardCheckedPath(currentPathname);

    if (safePathname !== currentPathname) {
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
    throw new Error("addEventListener가 구현되지 않았습니다.");
  }

  getCurrentPath() {
    throw new Error("getCurrentPath가 구현되지 않았습니다.");
  }

  replaceState() {
    throw new Error("replaceState가 구현되지 않았습니다.");
  }

  pushState() {
    throw new Error("pushState가 구현되지 않았습니다.");
  }
}
