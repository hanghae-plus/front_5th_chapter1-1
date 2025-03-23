import { isLoggedIn } from "./utils/login.js";
import MainPage from "./components/MainPage.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import ProfilePage from "./components/ProfilePage.jsx";

const root = document.getElementById("root");

const routes = {
  "/": MainPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "*": NotFoundPage,
};

const Render = () => {
  const path = window.location.pathname;
  const Component = routes[path] || routes["*"];
  if (Component.name === "ProfilePage" && !isLoggedIn()) {
    window.history.replaceState({}, "", "/login");
    Render();
    return;
  }
  root.innerHTML = Component();
};

Render();

// 클릭 이벤트 리스너
document.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    if (e.target.textContent === "로그아웃") {
      localStorage.removeItem("user");
      window.history.replaceState({}, "", "/");
      Render();
      return;
    }

    const path = e.target.href.split("/").pop();
    window.history.pushState({}, "", path ? path : "/");
    Render();
  }
});

// 라우터 이벤트 리스너
window.addEventListener("popstate", () => {
  Render();
});

// 로그인 폼 submit 이벤트 리스너
document.addEventListener("submit", (e) => {
  if (e.target.id === "login-form") {
    e.preventDefault();
    const username = document.getElementById("username").value;
    if (username) {
      localStorage.setItem(
        "user",
        JSON.stringify({ username, email: "", bio: "" }),
      );
      window.history.pushState({}, "", "/");
      Render();
    } else {
      alert("이메일 또는 전화번호를 입력해주세요.");
    }
  } else if (e.target.id === "profile-form") {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;
    localStorage.setItem("user", JSON.stringify({ username, email, bio }));
    window.history.pushState({}, "", "/profile");
    Render();
  }
});
