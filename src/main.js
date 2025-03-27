import { render, navigateTo } from "./router/router.js";
import { store } from "./store/store.js";
store.getUser();

document.body.addEventListener("click", (e) => {
  const linkEl = e.target.closest("a");
  if (linkEl) {
    e.preventDefault();
    const path = linkEl.getAttribute("href");
    navigateTo(path);
  }
  const logoutBtn = e.target.closest("#logout");
  if (logoutBtn) {
    e.preventDefault();
    store.clearUser("user");
  }
});

document.body.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;

  // 로그인 폼 처리
  if (form.id === "login-form") {
    console.log("login-form");
    const userName = form.querySelector("#username").value.trim();
    const user = {
      username: userName,
      email: "",
      bio: "",
    };
    if (userName) store.setUser(user);
    store.isLoggedIn = true;
    navigateTo("/profile");
  }

  // 프로필 폼 처리
  if (form.id === "profile-form") {
    const username = form.querySelector("#username").value.trim();
    const email = form.querySelector("#email").value.trim();
    const bio = form.querySelector("#bio").value.trim();
    const updatedUser = { username, email, bio };

    store.setUser(updatedUser);
    alert("프로필이 저장되었습니다!");
    render();
  }
});

window.addEventListener("popstate", render);
render();
