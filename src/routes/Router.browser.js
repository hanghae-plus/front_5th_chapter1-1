import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import Router from "./Router.basic";

class BrowserRouter extends Router {
  constructor() {
    super();
    // this.isGhPages = window.location.hostname === "jeong-wonho.github.io";
    this.repoName = "/front_5th_chapter1-1";
    //popState 이벤트 리스너 등록
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  //브라우저에 popState 이벤트 핸들러 연결
  handlePopState() {
    console.log("브라우저 popstate 이벤트 발생");
    this.handleRoute("root", this.cleanPath(window.location.pathname));
  }

  //navgiateTo 구현 필수
  navigateTo(path) {
    console.log("브라우저 라우터: navigateTo", path);
    history.pushState(null, "", this.cleanPath(path));
    //경로로 랜더링
    this.handleRoute("root", this.cleanPath(path));
  }

  // //handleRoute 구현 필수
  // handleRoute(element, path) {
  //   console.log("브라우저 라우팅 이동", path);
  //   //경로 정리
  //   const cleanedPath = this.cleanPath(path);
  //   console.log("cleanedPath", cleanedPath);
  //   //authGuard 실행
  //   const redirectPath = this.authGuard(cleanedPath);
  //   if (redirectPath) {
  //     console.log("인증 실패: 리다이렉트", redirectPath);
  //     this.navigateTo(redirectPath);
  //     return; // 렌더링 중단
  //   }
  //   //페이지 랜더링
  //   const renderElement = document.getElementById(element);
  //   if (renderElement) {
  //     renderElement.innerHTML = this.renderPage(cleanedPath);
  //     this.setupPageListeners(cleanedPath);
  //   }
  // }

  //init 구현 필수
  init() {
    this.addRoute("/", MainPage);
    this.addRoute("/login", LoginPage);
    this.addRoute("/profile", ProfilePage);
    this.handleRoute("root", this.cleanPath(window.location.pathname));
  }
}

export default BrowserRouter;
