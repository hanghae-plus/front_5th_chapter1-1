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

const detectPath = (page) => {
  if (ROUTES[page]) {
    app.innerHTML = ROUTES[page].template();
    ROUTES[page].action();
  } else {
    app.innerHTML = NotFoundPage();
  }
};

// NOTE : 기본 렌더
export const render = (page) => {
  history.pushState({}, "", page);
  detectPath(page);
};

export const router = () => {
  // NOTE : 메인 페이지 히스토리 초기화
  const { pathname } = window.location;
  if (!history.state) {
    history.replaceState({}, "", pathname);
  }
  render(pathname);
  detectPath(pathname);
};

window.addEventListener("popstate", (e) => {
  e.preventDefault();

  const { pathname } = location;
  detectPath(pathname);
});

router();
