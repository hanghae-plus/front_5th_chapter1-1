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

  // if (path === "/profile" && !isLogin) {
  //   history.replaceState(null, "", "/login");
  //   // renderLoginPage(); 페이지 이동 후 render가 되어야 정상동작되는데 이 부분을 추가하면 왜 테스트 코드에 에러가 나는가;;
  //   return;
  // }

  if (root) {
    root.innerHTML = Page();
  }

  if (path === "/login") {
    initLoginPage();
  }
  if (path === "/profile" && !isLogin) {
    history.replaceState(null, "", "/login");
    renderLoginPage();
    return;
  }
  if (path === "/profile" && isLogin) {
    updateProfile();
  }

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
