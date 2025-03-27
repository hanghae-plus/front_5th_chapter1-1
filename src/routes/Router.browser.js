import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import Router from "./Router.basic";

class BrowserRouter extends Router {
  constructor() {
    super();
    this.isGhPages = window.location.hostname === "localhost";
    this.repoName = "/front_5th_chapter1-1";
    //popState 이벤트 리스너 등록
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  //브라우저에서 repoName을 삭제해서 진행
  cleanPath(path) {
    // path가 null이나 undefined인 경우 기본값 제공
    if (!path) return "/";

    // this.repoName이 undefined인지 확인
    if (this.isGhPages && this.repoName && path.startsWith(this.repoName)) {
      // repoName을 제거한 후의 경로
      const cleanedPath = path.slice(this.repoName.length);

      // 시작이 '/'로 시작하지 않으면 '/'를 추가
      if (!cleanedPath.startsWith("/")) {
        return "/" + cleanedPath;
      }
      // 이미 '/'로 시작하면 그대로 반환
      return cleanedPath;
    }
    // gh-pages가 아닌 경우는 원래 경로 반환
    return path;
  }

  //브라우저에 popState 이벤트 핸들러 연결
  handlePopState() {
    console.log("브라우저 popstate 이벤트 발생");
    this.handleRoute("root", window.location.pathname);
  }

  //navgiateTo 구현 필수
  navigateTo(path) {
    console.log("브라우저 라우터: navigateTo", path);
    history.pushState(null, "", path);
    //경로로 랜더링
    this.handleRoute("root", path);
  }

  //handleRoute 구현 필수
  handleRoute(element, path) {
    console.log("브라우저 라우팅 이동", path);
    //경로 정리
    const cleanedPath = this.cleanPath(path);
    //페이지 랜더링
    const renderElement = document.getElementById(element);
    if (renderElement) {
      renderElement.innerHTML = this.renderPage(cleanedPath);

      this.setupPageListeners(cleanedPath);
    }
  }

  //init 구현 필수
  init() {
    this.addRoute("/", MainPage);
    this.addRoute("/login", LoginPage);
    this.addRoute("/profile", ProfilePage);
    this.handleRoute("root", window.location.pathname);
  }
}

export default BrowserRouter;
