import Router from "./router";

export default class HistoryRouter extends Router {
  constructor(routes) {
    super(routes);
  }

  initEventListeners() {
    window.addEventListener("popstate", () => this.handleRoute());
  }

  handleClickLink(e) {
    this.navigateTo(e.target.pathname);
  }

  getPath() {
    return window.location.pathname;
  }

  navigateTo(path) {
    window.history.pushState({}, "", path);
    this.handleRoute();
  }
}
