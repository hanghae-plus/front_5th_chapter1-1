import BaseRouter from "./BaseRouter.js";

class BrowserRouter extends BaseRouter {
  constructor(options = {}) {
    super(options);
    // popstate 이벤트 리스너 등록
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  // 실제 경로 가져오기 (baseUrl 고려)
  getActualPath(path) {
    if (this.baseUrl && path.startsWith(this.baseUrl)) {
      return path.substring(this.baseUrl.length) || "/";
    }
    return path;
  }

  // 페이지 이동 구현
  navigateTo(path) {
    const fullPath = this.baseUrl + path;
    history.pushState(null, "", fullPath);
    this.handleRoute(path);
  }

  // popstate 이벤트 처리
  handlePopState() {
    const actualPath = this.getActualPath(window.location.pathname);
    this.handleRoute(actualPath);
  }

  // 초기화 메서드 구현
  init() {
    // 페이지 로드 시 현재 경로 처리
    const actualPath = this.getActualPath(window.location.pathname);
    this.handleRoute(actualPath);
    return this;
  }
}

export default BrowserRouter;
