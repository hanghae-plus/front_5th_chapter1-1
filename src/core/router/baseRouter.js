export class BaseRouter {
  constructor(root, routes, options) {
    this.root = root;
    this.routes = routes;
    this.guard = null;
    this.basePath = options.basePath ?? "/";

    this.content = document.createElement("div");
    this.root.appendChild(this.content);
  }

  getCurrentPath() {
    const path = window.location.pathname;
    return this.formatPath(path);
  }

  getRoute(path) {
    const route = this.routes[path] ?? this.routes["*"];
    return route.redirect ? this.getRoute(route.redirect) : route;
  }

  renderComponent(route, path) {
    const fullPath = this.basePath + path.replace(/^\/+/, "");
    const { component } = route;
    if (typeof component !== "object") {
      throw new Error(`"${path}" 컴포넌트가 없습니다.`);
    }
    window.history.pushState(null, "", fullPath);
    this.content.innerHTML = component.template();
    if (typeof component.domEvent === "function") {
      component.domEvent({ contentElement: this.content });
    }
  }

  // eslint-disable-next-line no-unused-vars
  formatPath(_) {
    throw new Error("formatPath 메서드는 상속 클래스에서 구현해야 합니다.");
  }

  renderRoute(toPath) {
    const proceed = (path = toPath) => {
      const pathWithoutBase = path.replace(this.basePath, "/");
      const nextPath = this.formatPath(pathWithoutBase);
      const route = this.getRoute(nextPath);
      this.renderComponent(route, nextPath);
    };
    if (this.guard) {
      this.guard(this.formatPath(toPath), proceed);
    } else {
      proceed();
    }
  }

  start() {
    throw new Error("start 메서드는 상속 클래스에서 구현해야 합니다.");
  }

  // eslint-disable-next-line no-unused-vars
  navigate(_) {
    throw new Error("navigate 메서드는 상속 클래스에서 구현해야 합니다.");
  }

  beforeEach(callback) {
    this.guard = callback;
    return this;
  }
}
