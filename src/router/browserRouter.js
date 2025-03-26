import { BaseRouter } from "./router";

export class BrowserRouter extends BaseRouter {
  constructor() {
    super();
  }

  start() {
    window.addEventListener("popstate", () => this.render());

    const currentPath = window.location.pathname;
    const safePathname = this.getGuardCheckedPath(currentPath);

    if (currentPath !== safePathname) {
      history.replaceState({}, "", safePathname);
    }

    this.render(safePathname);
  }

  navigate(pathname) {
    // 현재 path랑 동일한 path로 가려고 하면 무시
    const currentPath = window.location.pathname;
    if (pathname === currentPath) return;

    // guard 체크된 안전한 페이지
    const safePathname = this.getGuardCheckedPath(pathname);

    // 안전한 page도 현재와 같으면 무시
    if (safePathname === currentPath) return;

    history.pushState({}, "", safePathname);
    this.render(safePathname);
  }
}
