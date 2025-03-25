import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";

const app = document.querySelector("#root");

const ROUTES = {
  "/": HomePage(),
  "/login": LoginPage(),
  "/profile": ProfilePage(),
};

// NOTE : 기본 렌더
export const render = (page) => {
  history.pushState({ page }, "", page);

  if (ROUTES[page]) {
    app.innerHTML = ROUTES[page].template();
    ROUTES[page].action();
  } else {
    app.innerHTML = NotFoundPage();
  }
};

export const router = () => {
  window.addEventListener("DOMContentLoaded", () => {
    // NOTE : 메인 페이지 히스토리 초기화
    const { pathname } = window.location;
    if (!history.state) {
      history.replaceState({ page: pathname }, "", pathname);
    }
    render(pathname);

    // NOTE : 뒤로가기
    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      render(e.state.page);
    });
  });
};

router();
