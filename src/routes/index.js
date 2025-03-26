class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  //route 추가
  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  // path로 이동한다.
  navigateTo(path) {
    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  // 브라우저가 뒤로가기 이벤트 한다.
  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  // path에 해당하는 핸들러를 실행.
  handleRoute(path) {
    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      console.log("404 Not Found");
    }
  }
}

export default Router;
