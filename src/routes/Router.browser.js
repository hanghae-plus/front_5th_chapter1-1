import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import Router from "./Router.basic";

class BrowserRouter extends Router {
  constructor() {
    super();

    //popState 이벤트 리스너 등록
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  //브라우저에 popState 이벤트 핸들러 연결
  handlePopState() {
    console.log("브라우저 popstate 이벤트 발생");
    this.handleRoute(window.location.pathname);
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
    //페이지 랜더링
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
    this.handleRoute("root", window.location.pathname);
  }
}

export default BrowserRouter;
