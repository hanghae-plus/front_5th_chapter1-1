//필요한 제반 사항을 정리해보자.
//1. 클래스 형태로 사용할 건지 함수형으로 사용할 건지.?
/**
 * 클래스를 사용한다.
 */
//2. 그 근거는 어디서 오는지?
/**
 * 클래스 형태로 작성하겠다. 그 이유는 hash 형태와 browser 라우팅 두가지 구현을 해야하는데, 공통되는 부분이 많다는 생각이 든다.
 */

import globalState from "../lib/globalState";
import {
  loginFormSubmitEvent,
  navLinkClickEvent,
  profileFormSubmitEvent,
} from "../lib/setEvent";
import ErrorPage from "../pages/ErrorPage";
import { authService } from "../services/authService";

//3. 반복되는 함수는 있는지?
/**
 *  작성해보고 설정한다.
 */
//4. 메서드가 하나의 작업만 처리하고 있는지?
/**
 * 작성해보고 설정한다.
 */
//5. 작성방식
/**
 * 우선적으로 basic router로 공통된 부분을 작성할 것이다.
 */

class Router {
  constructor() {
    this.routes = {};
    this.currentPath = "";
  }

  //route를 추가하는 메서드
  addRoute(path, component) {
    this.routes[path] = component;
  }

  //route를 읽는 메서드, 이게 화면을 랜더링 하는 것일 수도 있겠다.
  renderPage(path) {
    const routeHandler = this.routes[path];
    if (typeof routeHandler === "function") {
      return routeHandler();
    }
    return ErrorPage();
  }

  //로그 아웃 처리 , 라우터에서 기능하는게 맞을까??!!
  // logout() {
  //   globalState.initUser("user");
  // }
  //브라우저에서 repoName을 삭제해서 진행
  cleanPath(path) {
    // path가 null이나 undefined인 경우 기본값 제공
    if (!path) return "/";
    console.log("this.repoName", this.repoName);
    console.log("window.location.hostname", window.location.hostname);
    console.log("this.isGhPages", this.isGhPages);

    if (this.repoName && path.startsWith(this.repoName)) {
      // repoName을 제거한 후의 경로
      const cleanedPath = path.slice(this.repoName.length);
      console.log("cleanedPath", cleanedPath);

      // 시작이 '/'로 시작하지 않으면 '/'를 추가
      if (!cleanedPath.startsWith("/")) {
        console.log("cleanedPath", "/" + cleanedPath);
        return "/" + cleanedPath;
      }
      // 이미 '/'로 시작하면 그대로 반환
      return cleanedPath;
    }
    // gh-pages가 아닌 경우는 원래 경로 반환
    return path;
  }
  //헤더 링크 클릭 이벤트 , navigateTo 자식 클래스에서 구현
  //헤더 링크 클릭 (로직이 거의 동일한데 살짝 다름 95% 동일)
  handleLinkClick = (event) => {
    console.log("handleLinkClick 실행");
    if (event.target.tagName === "A") {
      event.preventDefault();
      console.log(
        "event.target.getAttribute('href')",
        event.target.getAttribute("href"),
      );
      const href = this.cleanPath(event.target.getAttribute("href"));
      const path = href.includes("#")
        ? href.split("#")[1]
        : this.cleanPath(href);
      console.log("path", path); ///{repoName}/logout 경로를 타고 갈때 repo이름이 붙는거 같다.
      if (this.cleanPath(href) === "/logout" || path === "/logout") {
        // 로그아웃 처리 로직
        authService.logout();
        this.navigateTo("/login");
        return;
      }
      this.navigateTo(href);
    }
  };

  //로그인 처리 (거의 동일), 이것도 여기 있는게 맞을까? 라우터인데.?
  handleLogin = (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    const username = document.getElementById("username").value;
    const password = document.getElementById("userPw").value;
    if (authService.login(username, password)) {
      this.navigateTo("/profile");
    } else if (!username || !password) {
      alert("이름 또는 비밀번호를 입력해주세요.");
    } else {
      alert("이름 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  //profile update 처리 프로필 업데이트인데 이것도 여기 있는게 맞을까?
  handleUpdateProfile = (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const bio = document.getElementById("bio").value.trim();

    if (username) {
      const user = {
        username: username,
        email: email,
        bio: bio,
      };

      globalState.setUser("user", user);
      // window.location.reload();
      this.navigateTo("/profile");
    }
  };

  //authGuard 생성
  authGuard(path) {
    console.log("authGuard 실행");
    console.log("path", path);
    const userData = globalState.getUser("user");
    console.log("userData", userData);
    //프로필 페이지 접근 시 인증 필요
    // 프로필 페이지 접근 시 인증 필요
    if (path === "/profile" && !userData) {
      console.log("인증 필요: 프로필 페이지 접근 시도");
      //여기서 navigateTo를 실행할 경우 테스트 통과가 되지 못하였다 why?
      // return this.navigateTo("/login");
      return "/login"; // 리다이렉트할 경로 반환
    }

    // 로그인 페이지에 이미 로그인한 상태로 접근 시
    if (path === "/login" && userData) {
      console.log("이미 로그인됨: 로그인 페이지 접근 시도");
      return "/"; // 홈으로 리다이렉트
    }

    // 인증 통과 또는 인증이 필요 없는 페이지
    return null; // 리다이렉트 필요 없음
  }

  //handleRoute 구현 필수
  handleRoute(element, path) {
    const redirectPath = this.authGuard(path);
    if (redirectPath) {
      console.log("인증 실패: 리다이렉트", redirectPath);
      this.navigateTo(redirectPath);
      return; // 렌더링 중단
    }
    // 인증 통과 또는 다른 페이지인 경우 렌더링 계속 진행
    const renderElement = document.getElementById(element);
    if (renderElement) {
      renderElement.innerHTML = this.renderPage(path);
      this.setupPageListeners(path);
    }
  }

  //authGuard형태로 표시하고 싶지만 일단 우선은 구현에 초점
  //authGuard생성 후 변경.
  setupPageListeners(path) {
    console.log("setupPageListeners path", path);
    this.currentPath = path;

    if (path === "/login") {
      // 로그인 관련 인증 검사 코드 제거 (이미 authGuard에서 처리)
      loginFormSubmitEvent(this.handleLogin);
    }

    // 프로필 페이지 리스너
    if (path === "/profile") {
      // 프로필 관련 인증 검사 코드 제거 (이미 authGuard에서 처리)
      profileFormSubmitEvent(this.handleUpdateProfile);
    }

    //네비게이션 리스너 (로그인, 로그아웃 페이지 제외)
    if (path !== "/login") {
      console.log("nav 이벤트 리스너 등록");
      // const navElement = document.querySelector("nav");
      // if (navElement) {
      //   navElement.removeEventListener("click", this.handleLinkClick);
      //   navElement.addEventListener("click", this.handleLinkClick);
      // }
      navLinkClickEvent(this.handleLinkClick);
    }
  }

  //자식 클래스에 각자 개발. 개발을 하지 않을 시 에러 발생
  navigateTo() {
    throw new Error("자식 클래스에서 해당 메서드 구현해야합니다.");
  }

  // //자식 클래스 에서 구현합니다.
  // handleRoute() {
  //   throw new Error("자식 클래스에서 해당 메서드 구현해야합니다.");
  // }

  //init 자식 메서드에서 구현합니다. 이렇게 Error를 호출하지 않으면 선언시 아무런 문제가 발생하지 않아, 어떤 문제 인지 알기 힘들다.

  init() {
    throw new Error("자식 클래스에서 구현합니다.");
  }
}

export default Router;
