import { LoginPage, setUpLoginForm } from "../pages/login";
import { MainPage } from "../pages/main";
import { NotFoundPage } from "../pages/notFound";
import { ProfilePage, updateProfile } from "../pages/profile";
import { Store } from "../store";

const hashRoutes = {
  ["/"]: MainPage,
  ["/login"]: LoginPage,
  ["/profile"]: ProfilePage,
};

export function hashRenderRoute() {
  const path = location.hash.replace(/^#/, "") || "/";
  const Page = hashRoutes[path] || NotFoundPage;
  const isLogin = Store.logIn();

  const root = document.getElementById("root");

  if (!root) {
    return;
  }

  //  정상적인 라우트 페이지를 가져온다. (없으면 NotFoundPage)
  root.innerHTML = Page();

  //로그인 안된 상태에서 프로필 페이지 접근 시 -> 로그인페이지로 리다이렉트
  if (path === "/profile" && !isLogin) {
    location.hash = "/login";
    root.innerHTML = hashRoutes["/login"]();
    return;
  }

  // 로그인 사용자가 로그인 페이지 접근 시 -> 메인 페이지로 리다이렉트
  if (path === "/login" && isLogin) {
    location.hash = "/";
    root.innerHTML = hashRoutes["/"]();
    return;
  }

  // 로그인 폼 제출관련
  if (path === "/login") {
    setUpLoginForm();
    return;
  }
  //  프로필 업데이트 관련
  if (path === "/profile" && isLogin) {
    updateProfile();
  }
}

export function navigateTo(path) {
  location.hash = path;
  hashRenderRoute();
}
