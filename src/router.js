import store from "./store";

export default class Router {
  root = null;
  routes = {};
  authRequired = ["/profile"];
  publicOnly = ["/login"];

  constructor(routes) {
    this.routes = routes;
    this.root = document.getElementById("root") || document.body;

    window.addEventListener("DOMContentLoaded", () => this.handleRoute());
    this.initEventListeners();
    this.initClickHandler();
  }

  initEventListeners() {}

  initClickHandler() {
    document.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        this.handleClickLink(e);
      }
    });
  }

  handleClickLink() {}

  getPath() {
    return "/";
  }

  checkAccess(path) {
    const { isLoggedIn } = store.getState();

    if (this.authRequired.includes(path)) {
      return isLoggedIn;
    }

    if (this.publicOnly.includes(path)) {
      return !isLoggedIn;
    }

    return true;
  }

  handleRoute() {
    const path = this.getPath();
    const { isLoggedIn } = store.getState();

    if (!this.checkAccess(path)) {
      if (isLoggedIn) {
        this.navigateTo("/");
      } else {
        this.navigateTo("/login");
      }
      return;
    }

    const component = this.routes[path] || this.routes["404"];
    const page = component();

    if (page.template) {
      this.root.innerHTML = page.template;

      if (page.init) {
        page.init();
      }
    } else {
      this.root.innerHTML = page;
    }

    window.scrollTo(0, 0);
  }

  navigateTo() {}
}
