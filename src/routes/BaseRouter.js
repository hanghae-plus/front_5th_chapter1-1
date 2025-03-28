import ErrorPage from "../pages/ErrorPage";

class BaseRouter {
  constructor(options = {}) {
    this.routes = {};
    this.rootElement = options.rootElement || document.getElementById("root");
    this.baseUrl = options.baseUrl || "";
  }

  //경로 추가
  addRoute(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  //페이지 이동
  // 추상 메서드 (주석으로 표시)
  // navigateTo(path) - 하위 클래스에서 구현해야 함

  handleRoute(path) {
    const handler = this.routes[path];
    if (handler) {
      // 핸들러가 함수인 경우 실행
      if (typeof handler === "function") {
        // 결과가 HTML 문자열이면 root 요소에 삽입
        const result = handler();
        if (typeof result === "string") {
          this.rootElement.innerHTML = result;
        }
        // 라우트 변경 후 이벤트 등록이 필요한 경우를 위한 콜백
        if (typeof this.onRouteChange === "function") {
          this.onRouteChange(path);
        }
      }
    } else {
      // 지정된 경로가 없으면 ErrorPage 렌더링
      // ErrorPage는 별도의 경로로 등록하지 않고 직접 import하여 사용
      this.rootElement.innerHTML = ErrorPage();

      // 에러 페이지에 대한 이벤트 리스너도 등록
      if (typeof this.onRouteChange === "function") {
        // 원래 경로를 전달하여 현재 URL 유지
        this.onRouteChange(path);
      }
    }
  }
  // 추상 메서드 (주석으로 표시)
  // navigateTo(path) - 하위 클래스에서 구현해야 함
}

export default BaseRouter;
