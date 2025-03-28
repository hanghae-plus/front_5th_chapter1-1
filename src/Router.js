export default class Router {
  currentPath;
  loginStore;
  basePath;

  addRoute(route, handler) {
    if (this._routes != null) {
      return;
    }
    this._routes[route] = handler;
  }

  // push 할 때는 base path 넣어서 보내고, 받아올 때는 base path를 빼서 담아주기
  constructor(routes, loginStore, basePath = "") {
    if (Router.instance) {
      return Router.instance; // 싱글톤 패턴을 위한 생성자 코드
    }
    Router.instance = this;

    this.basePath = basePath;
    this.currentPath = window.location.pathname.replace(this.basePath, "");
    console.log(this.currentPath);
    console.log(this.basePath);
    this._routes = routes;
    this.loginStore = loginStore;
  }

  startDetect() {
    window.addEventListener("popstate", () => {
      this.currentPath = window.location.pathname.replace(this.basePath, "");
      this.render();
    });
  }

  init() {
    this.startDetect();
    this.render();
  }

  // 1. router를 historyAPI를 사용해 구현
  //   navigate는 현재 경로를 path로 바꿔줍니다.
  //   상태를 변경시키면 이벤트를 발생시킨다.
  navigate(path) {
    this.currentPath = path;
    path = this.basePath + path;
    window.history.pushState({ path }, "", path);
    window.dispatchEvent(new Event("popstate"));
  }

  needRedirect(targetPath) {
    const isLoggedIn = this.loginStore.isLoggedIn();
    if (targetPath === "/profile" && !isLoggedIn) {
      return "/login";
    } else if (targetPath === "/login" && isLoggedIn) {
      return "/";
    }
  }

  // render 는 현재 경로를 기반으로 _handleRoute private 함수를 이용해서 handler가 반환한 컴포넌트 HTML을 렌더링 합니다
  render() {
    const redirectTarget = this.needRedirect(this.currentPath);
    if (redirectTarget != null) {
      this.navigate(redirectTarget);
    }

    const componentFn = this._handleRoute(this.currentPath);
    const component = componentFn({
      currentPath: this.currentPath,
      loginStore: this.loginStore,
    });

    this.attachDocument(component);
  }

  // handleRoute는 인자로 주어진 path가 있을 때 라우터 객체에서 핸들러 함수를 찾아서 반환합니다.
  _handleRoute(path) {
    const handler = this._routes[path] || this._routes["*"];
    return handler;
  }

  // attachDocuemnt 는 렌더링 하고자하는 컴포넌트를 문서에 추가합니다. DOM Element 렌더링
  attachDocument(component) {
    const app = document.getElementById("root");
    app.innerHTML = component;
  }
}
