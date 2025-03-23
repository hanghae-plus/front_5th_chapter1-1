import Router from "./router";

export default class HashRouter extends Router {
  constructor(routes) {
    super(routes);
  }

  initEventListeners() {
    window.addEventListener("hashchange", () => this.handleRoute());
  }

  handleClickLink(e) {
    this.navigateTo(e.target.getAttribute("href"));
  }

  getPath() {
    const hash = window.location.hash;
    return hash ? hash.substring(1) : "/";
  }

  navigateTo(path) {
    window.location.hash = path;
    this.handleRoute();
  }
}
