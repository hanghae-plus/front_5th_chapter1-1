import MainPage from "../pages/MainPage.js";
import LoginPage from "../pages/LoginPage.js";
import ProfilePage from "../pages/ProfilePage.js";
import ErrorPage from "../pages/ErrorPage.js";

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

    // 라우트 가드
    if (path === "/profile" && !userData.isLoggedIn()) {
      history.pushState({}, "", basePath + "/login");
      page = routes["/login"];
    } else if (path === "/login" && userData.isLoggedIn()) {
      history.pushState({}, "", basePath + "/");
      page = routes["/"];
    }

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
