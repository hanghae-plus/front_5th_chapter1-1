// path: ~/Develop/front_5th_chapter1-1/src/router/router.js
import { MainPage, ProfilePage, LoginPage, ErrorPage } from "../pages/index.js";

export const router = {
  // 전역 상태를 router 객체 내부로 유지하되 해시 기반으로 currentPath 관리
  state: {
    get currentPath() {
      return window.location.hash.replace(/^#/, "") || "/";
    },
    set currentPath(path) {
      window.location.hash = path;
    },
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

    let component = this.routes[path];

    if (path === "/profile" && !this.state.user) {
      this.navigateTo("/login");
      return;
    }

    if (!component) {
      component = ErrorPage;
    }

    root.innerHTML = component();
    this.setupEventListeners();
  },

  navigateTo(path) {
    this.state.currentPath = path; // 자동으로 location.hash 변경됨
    // render()는 hashchange 이벤트에서 호출되므로 여기선 생략 가능
  },

  setupEventListeners() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const path = link.getAttribute("href");
        this.navigateTo(path);
      });
    });

    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        this.state.user = null;
        this.navigateTo("/login");
      });
    }

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;

        const user = { username, email: "", bio: "" };
        localStorage.setItem("user", JSON.stringify(user));
        this.state.user = user;

        this.navigateTo("/");
      });
    }

    const profileForm = document.getElementById("profile-form");
    if (profileForm) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const bio = document.getElementById("bio").value;

        const user = { username, email, bio };
        localStorage.setItem("user", JSON.stringify(user));
        this.state.user = user;

        alert("프로필이 업데이트되었습니다.");
      });
    }
  },
};

// 해시 변경 이벤트로 라우팅
window.addEventListener("hashchange", () => {
  router.render();
});
