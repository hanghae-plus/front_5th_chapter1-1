import { Router } from "./router.js";
import { store } from "./store.js";

// 라우터 이벤트 리스너
window.addEventListener("popstate", () => {
  Router.Render();
});

// 클릭 이벤트 리스너
document.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    if (e.target.textContent === "로그아웃") {
      localStorage.removeItem("user");
      if (Router.RouterType === "hash") {
        window.location.hash = "/login";
      } else {
        window.history.replaceState({}, "", "/login");
      }
      Router.Render();
      return;
    }

    const path = e.target.href.split("/").pop();
    if (Router.RouterType === "hash") {
      window.location.hash = path ? "/" + path : "/";
    } else {
      window.history.pushState({}, "", path ? path : "/");
    }
    Router.Render();
  }
});

// 로그인 폼 submit 이벤트 리스너
document.addEventListener("submit", (e) => {
  if (e.target.id === "login-form") {
    e.preventDefault();
    const username = document.getElementById("username").value;
    if (username) {
      store.setData("user", { username, email: "", bio: "" });
    } else {
      alert("이메일 또는 전화번호를 입력해주세요.");
    }
  } else if (e.target.id === "profile-form") {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;
    store.setData("user", { username, email, bio });
  }
});
