import { formHandlers } from "../handler/formHandlers.js";

export const bindEvents = () => {
  // 폼 이벤트 처리
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", formHandlers.login);
  }

  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", formHandlers.profile);
  }

  // 로그아웃 버튼 이벤트 처리
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", formHandlers.logout);
  }
};
