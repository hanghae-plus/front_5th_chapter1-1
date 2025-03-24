import { initLoginPage, LoginPage, renderLoginPage } from "./pages/login";
import { MainPage } from "./pages/main";
import { NotFoundPage } from "./pages/notFound";
import { ProfilePage, updateProfile } from "./pages/profile";
import { Store } from "./store";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

export function renderRoute() {
  const path = window.location.pathname;
  const Page = routes[path] || NotFoundPage;

  const isLogin = Store.logIn();

  const root = document.getElementById("root");

  //1. 로그인 안된 상태에서 프로필 페이지 접근 시 -> 로그인페이지로 리다이렉트
  if (path === "/profile" && !isLogin) {
    history.replaceState(null, "", "/login");
    root.innerHTML = routes["/login"]();
    return;
  }
  // 2. 정상적인 라우트 페이지를 가져온다. (없으면 NotFoundPage)
  if (root) {
    root.innerHTML = Page();
  }

  // 3.로그인 페이지 동작 초기화
  if (path === "/login") {
    initLoginPage();
    return;
  }
  // 4. 프로필 업데이트 관련
  if (path === "/profile" && isLogin) {
    updateProfile();
  }

  //5. 로그아웃 버튼 이벤트 연결
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      Store.logout();
      history.replaceState(null, "", "/login");
      renderLoginPage();
    });
  }
}

export function navigateTo(path) {
  history.pushState({}, "", path);
  renderRoute();
}
