import BaseRouter from "./BaseRouter.js";

class HashRouter extends BaseRouter {
  constructor(options = {}) {
    super(options);
    // 해시 변경 이벤트 리스너 등록
    window.addEventListener("hashchange", this.handleHashChange.bind(this));
  }

  // 해시에서 경로 추출
  getPathFromHash() {
    console.log("getPathFromHash 실행", window.location.hash);
    return window.location.hash.slice(1) || "/";
  }

  // 페이지 이동 구현
  navigateTo(path) {
    window.location.hash = path;
  }

  // 해시 변경 이벤트 처리
  handleHashChange() {
    const path = this.getPathFromHash();
    this.handleRoute(path);
  }

  // 초기화 메서드 구현
  init() {
    // 페이지 로드 시 현재 해시 경로 처리
    this.handleHashChange();
    return this;
  }
}

export default HashRouter;
