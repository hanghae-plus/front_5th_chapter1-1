export class BaseRouter {
  constructor(routes) {
    if (new.target === BaseRouter) {
      throw new TypeError("BaseRouter는 상속으로만 사용할 수 있습니다.");
    }
    this.routes = routes;
    this.container = document.body.querySelector("#root");
  }

  render(pathname) {
    const route = this.routes[pathname] || this.routes["default"];
    route.render(this.container);
  }

  start() {
    this.render();
  }

  navigate() {
    throw new Error("navigate 메서드가 구현되지 않았습니다.");
  }
}
