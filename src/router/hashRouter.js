export class HashRouter {
  constructor(routes) {
    this.routes = routes;
    this.container = document.body.querySelector("#root");
  }

  getHashPath() {
    const hash = window.location.hash || "#/";
    return hash.replace(/^#/, "") || "/";
  }

  render(pathname = this.getHashPath()) {
    const route = this.routes[pathname] || this.routes["default"];
    route.render(this.container);
  }

  start() {
    this.render();
    window.addEventListener("hashchange", () => this.render());
  }

  navigate(pathname) {
    const hashPath = `#${pathname}`;
    if (window.location.hash !== hashPath) {
      window.location.hash = hashPath;
    }
  }
}
