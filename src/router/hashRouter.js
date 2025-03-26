import { BaseRouter } from "./router";

export class HashRouter extends BaseRouter {
  constructor() {
    super();
  }

  getUnhashedPath() {
    const hash = window.location.hash || "#/";
    return hash.replace(/^#/, "") || "/";
  }

  start() {
    window.addEventListener("hashchange", () => this.render());

    const currentPath = this.getUnhashedPath();
    const safePathname = this.getGuardCheckedPath(currentPath);

    if (currentPath !== safePathname) {
      const hashPath = `#${safePathname}`;
      window.location.hash = hashPath;
    }

    this.render(safePathname);
  }

  navigate(pathname) {
    // 현재 path랑 동일한 path로 가려고 하면 무시
    const currentPath = this.getUnhashedPath();
    if (pathname === currentPath) return;

    // guard 체크 후 안전한 페이지
    const safePathname = super.getGuardCheckedPath(pathname);

    // 안전한 page도 현재와 같으면 무시
    if (safePathname === currentPath) return;

    const hashPath = `#${safePathname}`;
    window.location.hash = hashPath;
    this.render(safePathname);
  }
}
