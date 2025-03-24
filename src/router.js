import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";

export const router = (app) => {
  const ROUTES = {
    "/": HomePage(),
    "/login": LoginPage(),
    "/profile": ProfilePage(),
  };

  // NOTE : 기본 렌더
  const render = (page) => {
    if (ROUTES[page]) {
      app.innerHTML = ROUTES[page];
    } else {
      app.innerHTML = NotFoundPage();
    }
  };

  // NOTE : 메인 페이지 히스토리 초기화
  window.addEventListener("DOMContentLoaded", () => {
    if (!history.state)
      history.replaceState(
        { path: window.location.pathname },
        "",
        window.location.pathname,
      );

    render(window.location.pathname);

    // NOTE : 로그인 버튼 클릭 시 로그인 페이지로
    const loginBtn = document.querySelector("#btn-login");
    if (loginBtn) {
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        history.pushState({ page: "login" }, "", "/login");
        render("/login");
      });
    }

    // NOTE : 프로필 버튼 클릭 시 프로필 페이지로
    const profileBtn = document.querySelector("#btn-profile");
    if (profileBtn) {
      profileBtn.addEventListener("click", (e) => {
        e.preventDefault();
        history.pushState({ page: "profile" }, "", "/profile");
        render("/profile");
      });
    }

    // NOTE : 뒤로가기
    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      render(e.state.path);
    });
  });
};
