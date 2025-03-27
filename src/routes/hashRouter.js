import MainPage from "../pages/MainPage.js";
import LoginPage from "../pages/LoginPage.js";
import ProfilePage from "../pages/ProfilePage.js";
import ErrorPage from "../pages/ErrorPage.js";

function HashRouter(userData) {
  const routes = {
    "/": MainPage,
    "/login": LoginPage,
    "/profile": ProfilePage,
  };

  // URL 해시를 경로로 변환
  function getHashRoute() {
    let hash = window.location.hash;
    if (!hash || hash === "#") return "/";
    return hash.startsWith("#/")
      ? hash.replace("#", "")
      : "/" + hash.replace("#", "");
  }

  function navigate(path) {
    // 경로가 '/'로 시작하면 '#'을 추가
    if (path.startsWith("/")) {
      window.location.hash = path;
    } else {
      window.location.hash = "/" + path;
    }
  }

  function render() {
    const path = getHashRoute();
    let page = routes[path];

    // 라우트 가드
    if (path === "/profile" && !userData.isLoggedIn()) {
      window.location.hash = "/login";
      return;
    } else if (path === "/login" && userData.isLoggedIn()) {
      window.location.hash = "/";
      return;
    }

    if (!page) {
      page = ErrorPage;
    }

    document.getElementById("root").innerHTML = page(userData);
  }

  function init() {
    window.addEventListener("hashchange", render);

    // 초기 렌더링
    if (!window.location.hash || window.location.hash === "#") {
      window.location.hash = "/";
    } else {
      // 약간의 지연을 통해 해시 변경 후 렌더링
      setTimeout(render, 10);
    }
  }

  return {
    navigate,
    init,
  };
}

export default HashRouter;
