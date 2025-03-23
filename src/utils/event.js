import { Render } from "./router.js";
import { store } from "./store.js";

// 라우터 이벤트 리스너
window.addEventListener("popstate", () => {
  Render();
});

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
    alert("프로필 수정 완료");
  }
});
