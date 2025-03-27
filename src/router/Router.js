export class Router {
  constructor(routes) {
    this.routes = routes;
    this.container = document.body.querySelector("#root");
  }

  normalizePathname(pathname) {
    if (window.BASE_ROUTE && pathname.startsWith(window.BASE_ROUTE)) {
      return pathname.slice(window.BASE_ROUTE.length);
    }
    return pathname;
  }

  render(pathname = window.location.pathname) {
    const normalizedPath = this.normalizePathname(pathname);
    const fullPath = window.BASE_ROUTE + normalizedPath;

    const route = this.routes[fullPath] || this.routes["default"];
    route.render(this.container);
  }

  start() {
    this.render();
    window.addEventListener("popstate", () => this.render());
  }

  navigate(pathname) {
    // pathname이 이미 '/'로 시작하는지 확인
    const path = pathname.startsWith("/") ? pathname : `/${pathname}`;

    // BASE_ROUTE를 포함한 전체 경로 계산
    const fullPath = window.BASE_ROUTE + path;

    // 현재 경로와 다르면 이동
    if (fullPath !== window.location.pathname) {
      history.pushState({}, "", fullPath);
      this.render(fullPath);
    }
  }
}
