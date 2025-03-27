import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import ErrorPage from "./pages/ErrorPage.js";
import MainPage from "./pages/MainPage.js";
import { state, checkLoginStatus } from "./state/state.js";
import { handleProfileSubmit } from "./eventHandler.js";

const handleLogout = () => {
  localStorage.removeItem("user");
  state.loggedIn = false; // 로그아웃 상태로 변경
  location.hash = "#/login";
  render();
};

const handleSubmit = (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = ""; // 필요하다면 적절한 이메일 값을 설정
  const bio = ""; // 필요하다면 적절한 bio 값을 설정

  // 사용자 정보를 로컬스토리지에 저장
  localStorage.setItem("user", JSON.stringify({ username, email, bio }));

  checkLoginStatus();
  // 상태 변경 후 페이지 이동
  location.hash = "#/profile";
  render();
};

const App = () => {
  checkLoginStatus();

  const route = location.hash.replace("#", "") || "/";

  if (route === "/profile") {
    if (!state.loggedIn) {
      // user가 없으면 로그인 페이지로 리디렉션
      location.hash = "#/login";
      return LoginPage();
    }
    return ProfilePage();
  }

  if (route === "/login") {
    if (state.loggedIn) {
      // 로그인 상태에서 로그인 페이지로 접근하면 메인 페이지로 리디렉션
      location.hash = "#/";
      return MainPage();
    }
    return LoginPage();
  }

  if (route === "/logout") {
    handleLogout();
    return LoginPage();
  }

  if (route === "/") {
    return MainPage();
  }

  return ErrorPage();
};

const render = () => {
  document.body.innerHTML = App();

  // 로그인 폼 이벤트 바인딩
  const form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }

  // 프로필 수정 폼 이벤트 바인딩
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", handleProfileSubmit);
  }

  // 로그아웃 버튼 클릭 이벤트 추가
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }
};

// 페이지 전환 시 새로고침을 방지하고 상태 업데이트를 하도록 수정
window.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault(); // 새로고침 방지

    const href = e.target.getAttribute("href");
    if (!href) return;

    location.hash = href; // 해시 변경
    render(); // 페이지를 새로 렌더링
  }
});

// 해시 변경을 감지하여 자동으로 렌더링
window.addEventListener("hashchange", render);

// SPA의 초기 렌더링
render();
