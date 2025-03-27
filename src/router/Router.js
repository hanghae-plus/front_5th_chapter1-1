export class Router {
  constructor(routes) {
    this.routes = routes;
    this.container = document.body.querySelector("#root");
  }

  render(pathname = window.location.pathname) {
    if (this.routes[pathname]) {
      this.routes[pathname].render(this.container);
      return;
    }

    let normalizedPath = pathname;
    if (window.BASE_ROUTE && pathname.startsWith(window.BASE_ROUTE)) {
      normalizedPath = pathname.slice(window.BASE_ROUTE.length) || "/";
    }

    const routeKey = `${window.BASE_ROUTE}${normalizedPath === "/" ? "" : normalizedPath}`;

    const route = this.routes[routeKey] || this.routes.default;
    route.render(this.container);
  }

  start() {
    this.render();
    window.addEventListener("popstate", () => this.render());
  }

  navigate(pathname) {
    const path = pathname.startsWith("/") ? pathname : `/${pathname}`;

    const fullPath = window.BASE_ROUTE + path;

    if (fullPath !== window.location.pathname) {
      history.pushState({}, "", fullPath);
      this.render(fullPath);
    }
  }
}
