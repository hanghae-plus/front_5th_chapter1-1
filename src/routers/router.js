import { LoginPage, setUpLoginForm } from "../pages/login";
import { MainPage } from "../pages/main";
import { NotFoundPage } from "../pages/notFound";
import { ProfilePage, updateProfile } from "../pages/profile";
import { Store } from "../store";

const isProd = location.hostname.includes("github.io");
const BASE_PATH = isProd ? "/front_5th_chapter1-1" : "";

const routes = {
  [`${BASE_PATH}/`]: MainPage,
  [`${BASE_PATH}/login`]: LoginPage,
  [`${BASE_PATH}/profile`]: ProfilePage,
};

export function renderRoute() {
  const root = document.getElementById("root");
  const path = window.location.pathname;

  const isLogin = Store.logIn();

  const Page = routes[path] || NotFoundPage;

  if (!root) {
    return;
  }

  // 정상적인 라우트 페이지를 가져온다. (없으면 NotFoundPage)
  root.innerHTML = Page();

  //비로그인 상태에서 프로필 페이지 접근 시 -> 로그인페이지로 리다이렉트
  if (path === `${BASE_PATH}/profile` && !isLogin) {
    history.replaceState(null, "", `${BASE_PATH}/login`);
    root.innerHTML = routes[`${BASE_PATH}/login`]();
    return;
  }

  // 로그인 사용자가 로그인 페이지 접근 시 -> 메인 페이지로 리다이렉트
  if (path === `${BASE_PATH}/login` && isLogin) {
    history.replaceState(null, "", `${BASE_PATH}/`);
    root.innerHTML = routes[`${BASE_PATH}/`]();
    return;
  }

  // 로그인 폼 제출관련
  if (path === `${BASE_PATH}/login` && !isLogin) {
    setUpLoginForm();

    return;
  }
  // 프로필 업데이트 관련
  if (path === `${BASE_PATH}/profile` && isLogin) {
    updateProfile();
  }
}

export function navigateTo(path) {
  history.pushState({}, "", path);
  renderRoute();
}
