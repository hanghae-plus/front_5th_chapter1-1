import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import Router from "./Router.basic";

class HashRouter extends Router {
  constructor() {
    super();

    //해시 변경 이벤트 리스너 등록
    window.addEventListener("hashchange", this.handleHashChange.bind(this));
  }

  //해시에서 경로 추출
  getCurrentPath() {
    console.log("해시 라우터: getCurrentPath", window.location.hash);
    return window.location.hash.slice(1) || "/";
  }

  // 해시 변경 이벤트 핸들러
  handleHashChange() {
    console.log("해시 변경 감지됨");
    const path = this.getCurrentPath();
    this.handleRoute("root", path);
  }

  //navigateTo(path) 구현 필수
  navigateTo(path) {
    console.log("해시 라우터: navigateTo", path);
    //#을 입력안해도 자동으로 #이 들어간다.
    window.location.hash = path;
  }

  //handleRoute 구현 필수
  handleRoute(element, path) {
    console.log("해시 라우터: handleRoute", path);
    const renderElement = document.getElementById(element);
    if (renderElement) {
      renderElement.innerHTML = this.renderPage(path);
      this.setupPageListeners(path);
    }
  }
  //init 구현 필수
  init() {
    this.addRoute("/", MainPage);
    this.addRoute("/login", LoginPage);
    this.addRoute("/profile", ProfilePage);

    if (!window.location.hash) {
      window.location.hash = "/";
    } else {
      const path = this.getCurrentPath();
      console.log("해시 라우터: init", path);
      this.handleRoute("root", path);
    }
  }
}

export default HashRouter;
