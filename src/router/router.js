export class Router {
  constructor(routes) {
    this.routes = routes;
  }

  render(pathname = window.location.pathname) {
    const route = this.routes[pathname] || this.routes["default"];
    route.render();
  }

  start() {
    this.render();
    window.addEventListener("popstate", () => this.render());
  }

  navigate(pathname) {
    if (pathname !== window.location.pathname) {
      history.pushState({}, "", pathname);
      this.render(pathname);
    }
  }
}
