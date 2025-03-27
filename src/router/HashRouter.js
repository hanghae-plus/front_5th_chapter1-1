export class HashRouter {
  constructor(routes) {
    this.routes = routes;
    this.container = document.body.querySelector("#root");
  }

  render(path = this.getPath()) {
    // Find the matching route without the # prefix
    const route = this.routes[path] || this.routes["default"];
    route.render(this.container);
  }

  start() {
    this.render();
    window.addEventListener("hashchange", () => this.render());
  }

  navigate(path) {
    const currentPath = this.getPath();
    // Fix: Compare path with currentPath directly, not as a function call
    if (this.routes[path] !== this.routes[currentPath]) {
      window.location.hash = path.startsWith("/") ? path : `/${path}`;
      this.render(path);
    }
  }

  getPath() {
    return window.location.hash.slice(1) || "/";
  }
}
