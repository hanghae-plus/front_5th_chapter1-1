import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";

export const app = document.querySelector("#root");

const detectPath = (page) => {
  const ROUTES = {
    "/": HomePage(),
    "/login": LoginPage(),
    "/profile": ProfilePage(),
  };

  let path = page;

  if (ROUTES[path]) {
    app.innerHTML = ROUTES[path].template();
    ROUTES[path].action();
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
  const { pathname } = location;
  if (!history.state) {
    history.replaceState({}, "", pathname);
  }
  render(pathname);
};

window.addEventListener("popstate", (e) => {
  e.preventDefault();

  const { pathname } = location;
  detectPath(pathname);
});

router();
