export class HashRouter {
  constructor(routes) {
    this.routes = routes;
    this.container = document.body.querySelector("#root");
  }

  render(path = this.getPath()) {
    const route = this.routes[path] || this.routes["default"];
    route.render(this.container);
  }

  start() {
    if (!window.location.hash) {
      window.location.hash = "#/";
    }
    this.render();
    window.addEventListener("hashchange", () => this.render());
  }

  navigate(path) {
    const currentPath = this.getPath();
    if (this.routes[path] !== this.routes[currentPath]) {
      window.location.hash = path.startsWith("/") ? path : `/${path}`;
      this.render(path);
    }
  }

  getPath() {
    return window.location.hash.slice(1) || "/";
  }
}
