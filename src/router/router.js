// path: ~/Develop/front_5th_chapter1-1/src/router/router.js
import { MainPage, ProfilePage, LoginPage, ErrorPage } from "../pages/index.js";

export const router = {
  // 전역 상태를 router 객체 내부로 이동
  state: {
    currentPath: window.location.pathname,
    user: JSON.parse(localStorage.getItem("user")) || null,
  },

  routes: {
    "/": MainPage,
    "/login": LoginPage,
    "/profile": ProfilePage,
  },

  render() {
    const path = this.state.currentPath;
    const root = document.getElementById("root");

    // 현재 경로에 해당하는 컴포넌트 찾기
    let component = this.routes[path];

    // 경로가 없거나 프로필 페이지 접근 시 로그인 필요 확인
    if (!component) {
      component = ErrorPage;
    } else if (path === "/profile" && !this.state.user) {
      this.navigateTo("/login");
      return;
    }

    // 페이지 렌더링
    root.innerHTML = component();

    // 이벤트 리스너 등록
    this.setupEventListeners();
  },

  navigateTo(path) {
    history.pushState(null, null, path);
    this.state.currentPath = path;
    this.render();
  },

  setupEventListeners() {
    // 링크 클릭 이벤트 처리
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const path = link.getAttribute("href");
        this.navigateTo(path);
      });
    });

    // 로그아웃 버튼 클릭 이벤트 처리
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        this.state.user = null;
        this.navigateTo("/login");
      });
    }

    // 로그인 폼 제출 이벤트 처리
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;

        // 사용자 정보 저장
        const user = {
          username,
          email: "",
          bio: "",
        };

        localStorage.setItem("user", JSON.stringify(user));
        this.state.user = user;

        this.navigateTo("/");
      });
    }

    // 프로필 폼 제출 이벤트 처리
    const profileForm = document.getElementById("profile-form");
    if (profileForm) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const bio = document.getElementById("bio").value;

        // 사용자 정보 업데이트
        const user = { username, email, bio };
        localStorage.setItem("user", JSON.stringify(user));
        this.state.user = user;

        // 사용자에게 피드백 제공
        alert("프로필이 업데이트되었습니다.");
      });
    }
  },
};
