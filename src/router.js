import { MainPage, LoginPage, ProfilePage, ErrorPage } from "./components.js";

function Router(userData) {
  const routes = {
    "/": MainPage,
    "/login": LoginPage,
    "/profile": ProfilePage,
  };

  function navigate(path) {
    history.pushState({}, "", path);
    render();
  }

  function render() {
    const path = window.location.pathname;
    let page = routes[path];

    // 로그인 상태에 따른 리디렉션 처리
    if (path === "/profile" && !userData.isLoggedIn()) {
      history.pushState({}, "", "/login");
      page = routes["/login"];
    } else if (path === "/login" && userData.isLoggedIn()) {
      history.pushState({}, "", "/");
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
