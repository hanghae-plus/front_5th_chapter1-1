export default class Router {
  currentPath;
  loginStore;

  addRoute(route, handler) {
    if (this._routes != null) {
      return;
    }
    this._routes[route] = handler;
  }

  // singleton
  constructor(routes, loginStore) {
    if (Router.instance) {
      return Router.instance; // 이게 싱글톤 패턴을 위한 생성자 코드
    }
    this.currentPath = window.location.pathname;
    this._routes = routes;
    this.loginStore = loginStore;
    Router.instance = this;
  }

  init() {
    this.startDetect();

    if (this.currentPath === "") {
      this.router.navigate("/");
    } else {
      this.render();
    }
  }

  // 1. router를 historyAPI를 사용해 구현
  // checkLogin
  needLogin(path) {
    const isLoggedIn = this.loginStore.isLoggedIn();
    if (path !== "login" && !isLoggedIn) {
      return true;
    } else {
      return false;
    }
  }

  // navigate는 현재 경로를 path로 바꿔줍니다.
  // 상태를 변경시키면 이벤트를 발생시킨다.
  navigate(path) {
    this.currentPath = path;
    window.history.pushState({}, "", path);
  }

  startDetect() {
    window.addEventListener("popstate", () => {
      this.render();
    });
  }

  redirectForLogin() {
    if (this.needLogin(this.currentPath)) {
      this.navigate("/login");
      return;
    }
  }

  // render 는 현재 경로를 기반으로 _handleRoute private 함수를 이용해서 handler가 반환한 컴포넌트 HTML을 렌더링 합니다
  render() {
    this.redirectForLogin();
    const componentFn = this._handleRoute(this.currentPath);
    const component = componentFn();
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
