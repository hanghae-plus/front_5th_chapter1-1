import { MainPage, LoginPage, ProfilePage, ErrorPage } from "./components.js";

function Router(userData) {
  // 기본 경로 (GitHub Pages 배포용)
  const BASE_URL = import.meta.env.BASE_URL || "/";

  const routes = {
    "/": MainPage,
    "/login": LoginPage,
    "/profile": ProfilePage,
  };

  function navigate(path) {
    // 경로 앞에 BASE_URL을 추가합니다
    const fullPath =
      BASE_URL.endsWith("/") && path.startsWith("/")
        ? BASE_URL + path.substring(1)
        : BASE_URL + path;

    history.pushState({}, "", fullPath);
    render();
  }

  function render() {
    // BASE_URL을 제거하고 실제 경로만 추출
    let path = window.location.pathname;

    // GitHub Pages 경로 처리
    if (BASE_URL !== "/" && path.startsWith(BASE_URL)) {
      path = path.slice(
        BASE_URL.endsWith("/") ? BASE_URL.length - 1 : BASE_URL.length,
      );
    }

    // 빈 경로를 루트로 변경
    if (path === "") path = "/";
    if (!path.startsWith("/")) path = "/" + path;

    console.log("현재 경로:", path);

    let page = routes[path];

    // 로그인 상태에 따른 리디렉션 처리
    if (path === "/profile" && !userData.isLoggedIn()) {
      navigate("/login");
      return; // 리디렉션 후 렌더링 중단
    } else if (path === "/login" && userData.isLoggedIn()) {
      navigate("/");
      return; // 리디렉션 후 렌더링 중단
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
