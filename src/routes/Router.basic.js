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

  //헤더 링크 클릭 이벤트 , navigateTo 자식 클래스에서 구현
  //헤더 링크 클릭 (로직이 거의 동일한데 살짝 다름 95% 동일)
  handleLinkClick = (event) => {
    console.log("handleLinkClick 실행");
    if (event.target.tagName === "A") {
      event.preventDefault();
      const href = event.target.getAttribute("href");
      const path = href.includes("#") ? href.split("#")[1] : href;
      console.log("handleLinkClick", path);
      if (href === "/logout" || path === "/logout") {
        console.log("/logout 실행");
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

    // 해당 부분 authService로 분리해서 좀 더 간결하게 처리 해보려고 했습니다.
    // if (username === "testuser") {
    //   const user = {
    //     username: username,
    //     email: "",
    //     bio: "",
    //   };
    //   globalState.setUser("user", user);
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
      window.location.reload();
    }
  };

  //authGuard형태로 표시하고 싶지만 일단 우선은 구현에 초점
  setupPageListeners(path) {
    console.log("setupPageListeners path", path);
    this.currentPath = path;
    const userData = globalState.getUser("user");

    if (path === "/login") {
      if (userData) {
        this.navigateTo("/");
        return;
      }
      const loginForm = document.getElementById("login-form");
      if (loginForm) {
        loginForm.removeEventListener("submit", this.handleLogin);
        loginForm.addEventListener("submit", this.handleLogin);
      }
    }

    // 프로필 페이지 리스너
    if (path === "/profile" && !userData) {
      this.navigateTo("/login");
      return;
    } else {
      const profileForm = document.getElementById("profile-form");
      if (profileForm) {
        profileForm.removeEventListener("submit", this.handleUpdateProfile);
        profileForm.addEventListener("submit", this.handleUpdateProfile);
      }
    }

    //네비게이션 리스너 (로그인, 로그아웃 페이지 제외)
    if (path !== "/login") {
      console.log("nav 이벤트 리스너 등록");
      const navElement = document.querySelector("nav");
      if (navElement) {
        navElement.removeEventListener("click", this.handleLinkClick);
        navElement.addEventListener("click", this.handleLinkClick);
      }
    }
  }

  //자식 클래스에 각자 개발. 개발을 하지 않을 시 에러 발생
  navigateTo() {
    throw new Error("자식 클래스에서 해당 메서드 구현해야합니다.");
  }

  //자식 클래스 에서 구현합니다.
  handleRoute() {
    throw new Error("자식 클래스에서 해당 메서드 구현해야합니다.");
  }

  //init 자식 메서드에서 구현합니다. 이렇게 Error를 호출하지 않으면 선언시 아무런 문제가 발생하지 않아, 어떤 문제 인지 알기 힘들다.

  init() {
    throw new Error("자식 클래스에서 구현합니다.");
  }
}

export default Router;
