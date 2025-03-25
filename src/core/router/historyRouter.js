import { BaseRouter } from "./baseRouter.js";

export class HistoryRouter extends BaseRouter {
  formatPath(path) {
    return path.replace(this.basePath, "/");
  }

  start() {
    window.addEventListener("popstate", () => {
      this.renderRoute(window.location.pathname);
    });
    window.addEventListener("DOMContentLoaded", () => {
      this.renderRoute(window.location.pathname);
      document.body.addEventListener("click", this.onLinkClick.bind(this));
    });
  }

  onLinkClick(e) {
    const link = e.target.closest("#menu a");
    if (!link) return;
    e.preventDefault();
    const newPathname = link.href.replace(window.location.origin, "");
    if (window.location.pathname === newPathname) return;
    this.renderRoute(newPathname);
  }

  navigate(path) {
    this.renderRoute(path);
  }
}
