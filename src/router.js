import { layout } from "./layout.js";
import { MainPage } from "./pages/MainPage";
import { LoginPage, setupLogin } from "./pages/LoginPage";
import { ProfilePage, updateProfile } from "./pages/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage";
import { Logout } from "./component/Header.js";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
  "/404": ErrorPage,
};

export const router = () => {
  let path = window.location.pathname;
  //로그인 확인
  const user = JSON.parse(localStorage.getItem("user") || "null");

  //유저 정보가 없고 프로필 페이지 접속하려고 한다면 로그인 페이지로 이동
  if (path === "/profile" && !user) {
    path = "/login";
    window.history.replaceState({}, "", path);
  }

  //유저정보가 있고 로그인 페이지 접소하려고 한다면 홈 페이지로 이동
  if (path === "/login" && user) {
    path = "/";
    window.history.replaceState({}, "", path);
  }

  const Page = routes[path] || routes["/404"];
  const html = path === "/login" || path === "/404" ? Page() : layout(Page);

  document.getElementById("root").innerHTML = html;

  // /login 경로에서만 setupLogin 호출
  if (path === "/login") {
    setupLogin();
  }

  // 헤더가 있는 경우 (layout을 썼을 경우), 로그아웃 이벤트도 바인딩
  if (path !== "/login" && path !== "/404") {
    Logout();
  }

  if (path == "/profile") {
    updateProfile();
  }

  setupNavigation();
};

// 전역에서 router 호출 가능하도록 (LoginPage에서 필요)
window.router = router;

//a링크 클릭 시 기본 새로고침 막음
const setupNavigation = () => {
  document.querySelectorAll("a").forEach((link) => {
    link.removeEventListener("click", handleLinkClick);
    link.addEventListener("click", handleLinkClick);
  });
};

const handleLinkClick = (e) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");
  window.history.pushState({}, "", href);
  router();
};

window.addEventListener("popstate", router); //뒤로가기
window.addEventListener("DOMContentLoaded", () => {
  router();
});
