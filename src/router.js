import { MainPage, LoginPage, ProfilePage, ErrorPage } from "./components.js";

function Router(userData) {
  // base path 가져오기 (GitHub Pages 배포 시 사용됨)
  const getBasePath = () => {
    // vite.config.js의 base 설정과 일치시킴
    return import.meta.env.MODE === "production" ? "/front_5th_chapter1-1" : "";
  };

  const basePath = getBasePath();

  const routes = {
    "/": MainPage,
    "/login": LoginPage,
    "/profile": ProfilePage,
  };

  function navigate(path) {
    history.pushState({}, "", basePath + path);
    render();
  }

  function render() {
    const fullPath = window.location.pathname;
    // basePath를 제거하여 실제 라우트 경로 추출
    const path = fullPath.replace(basePath, "") || "/";

    let page = routes[path];

    // 로그인 상태에 따른 리디렉션 처리
    if (path === "/profile" && !userData.isLoggedIn()) {
      history.pushState({}, "", basePath + "/login");
      page = routes["/login"];
    } else if (path === "/login" && userData.isLoggedIn()) {
      history.pushState({}, "", basePath + "/");
      page = routes["/"];
    }

    // 존재하지 않는 경로일 경우 404 페이지 표시
    if (!page) {
      page = ErrorPage;
    }

    document.getElementById("root").innerHTML = page(userData);
  }

  function init() {
    render();
    window.addEventListener("popstate", render);
  }

  return {
    navigate,
    init,
  };
}

export default Router;
