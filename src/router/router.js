import { routes } from "../routes.js";
import { auth } from "../utils/auth.js";
import { bindEvents } from "../utils/eventBinding.js";

// 내비게이션 함수
export const navigate = (path) => {
  window.history.pushState({}, "", path);
  router();
};

export const getCurrentPath = () => {
  // 현재 경로 가져오기
  let path = window.location.pathname;

  // 경로가 비어있으면 루트로 설정
  if (path === "" || path === "/") {
    path = "/";
  }

  return path;
};

export const router = () => {
  const currentPath = getCurrentPath();

  // Auth state checks (로그인 상태 체크)
  if (auth.isAuthenticated()) {
    // 로그인된 사용자가 /login 페이지 접근 시도할 경우
    if (currentPath === "/login") {
      navigate("/");
      return;
    }
  } else {
    // 로그인되지 않은 사용자가 보호된 라우트 접근 시도할 경우
    if (currentPath === "/profile") {
      navigate("/login");
      return;
    }
  }

  // routes에 없는 경로는 404 페이지로 처리
  const PageComponent = routes[currentPath] || routes["/404"];
  const rootElement = document.getElementById("root");
  rootElement.innerHTML =
    typeof PageComponent === "function" ? PageComponent() : PageComponent;

  // Bind events after rendering
  bindEvents();
};
