import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

const routes = {
  "/": Main,
  "/login": Login,
  "/profile": Profile,
  "/404": NotFound,
};

// url 변경 및 템플릿 출력
export const navigate = (path) => {
  let validatedPath = routes[path] ? path : "/404";

  // 로그인 체크
  if (validatedPath === "/profile" && !isLoggedIn()) {
    validatedPath = "/login";
  }

  history.pushState(null, null, validatedPath);
  const PageClass = routes[validatedPath];
  new PageClass();
};

// 앵커 태그 제어
document.body.addEventListener("click", (e) => {
  const anchor = e.target.closest("a");
  if (anchor) {
    e.preventDefault();

    if (anchor.text === "로그아웃") {
      localStorage.removeItem("user");
      navigate("/login");
      return;
    } else if (anchor.text === "로그인") {
      navigate("/login");
      return;
    }

    const path = anchor.href.replace(window.location.origin, "");
    navigate(path);
  }
});

// 앞으로, 뒤로가기 제어
window.addEventListener("popstate", () => {
  navigate(window.location.pathname);
});

// 주소로 접근 시
window.addEventListener("load", () => {
  navigate(window.location.pathname);
});
