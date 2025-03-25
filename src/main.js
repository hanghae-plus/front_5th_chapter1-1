import { MainPage, handleMain } from "./pages/MainPage.js";
import { LoginPage, handleLogin } from "./pages/LoginPage.js";
import { ProfilePage, handleProfile } from "./pages/ProfilePage.js";
import ErrorPage from "./pages/ErrorPage.js";
import { isAuthenticated } from "./utils/auth.js";
import { navigateTo } from "./utils/router.js";

const routes = {
  "/login": LoginPage,
  "/profile": ProfilePage,
  "/": MainPage,
};

const handleLink = () => {
  const links = document.querySelectorAll("a");
  links.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const newPath = e.target.getAttribute("href");
      navigateTo(newPath);
    });
  });
};

// 페이지 렌더링 함수
const renderPage = (path) => {
  if (path === "/login" && isAuthenticated()) {
    navigateTo("/profile");
    return;
  }

  if (path === "/profile" && !isAuthenticated()) {
    navigateTo("/login");
    return;
  }

  const App = routes[path] ? routes[path] : ErrorPage;
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = App();
  }

  // 페이지 내 링크들을 핸들링
  handleLink();

  // 각 페이지에 맞는 핸들러 호출
  if (path === "/login") handleLogin();
  if (path === "/profile") handleProfile();
  if (path === "/") handleMain();
};

// 초기 페이지 렌더링
document.addEventListener("DOMContentLoaded", () => {
  renderPage(location.pathname); // 처음 로드된 페이지 렌더링
});

// popstate 이벤트 처리 (뒤로 가기, 앞으로 가기 처리)
window.addEventListener("popstate", () => {
  // URL 변경시 페이지 리렌더링
  renderPage(location.pathname);
});

export { renderPage };
