import { hashHandleRoute, hashNavigateTo } from "./hashRouter.js";

// 해시 변경을 감지하여 라우팅 처리
window.addEventListener("hashchange", hashHandleRoute);
window.addEventListener("DOMContentLoaded", hashHandleRoute);

document.body.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="/"]')) {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    hashNavigateTo(path);
  }
  if (e.target && e.target.id === "logout") {
    hashNavigateTo("/login");
  }
});

document.body.addEventListener("submit", (e) => {
  if (e.target.matches('form[id="login-form"]')) {
    hashNavigateTo("/");
  }
});
