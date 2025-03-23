import { BaseRouter } from "./baseRouter.js";

export class HistoryRouter extends BaseRouter {
  formatPath(path) {
    return path;
  }

  start() {
    window.addEventListener("popstate", () =>
      this.renderRoute(window.location.pathname),
    );
    document.body.addEventListener("click", this.onLinkClick.bind(this));
    this.renderRoute(window.location.pathname);
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
