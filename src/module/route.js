import user from "./user";
import routeConfig from "../config/routerConfig";

// 라우트 관리
const router = (function () {
  const getCurrentPath = () => {
    if (routeConfig.getMode() === "hash") {
      const hash = window.location.hash;
      // 빈 해시나 '#'만 있는 경우 '/'를 반환
      return hash === "" || hash === "#" ? "/" : hash.slice(1);
    }
    return window.location.pathname;
  };

  const authRoutes = ["/profile"];
  const guestRoutes = ["/login"];

  // 라우트 변경 이벤트
  const handleRoute = () => {
    window.dispatchEvent(new Event("routechange"));
  };

  // 인증 체크 함수
  const checkAuth = (path) => {
    const { isLoggedIn } = user();

    // 로그인한 사용자가 /login 같은 페이지 접근 시도할 때
    if (guestRoutes.includes(path) && isLoggedIn) {
      if (routeConfig.getMode() === "hash") {
        window.location.hash = "/";
      } else {
        window.history.pushState(null, "", "/");
      }
      handleRoute();
      return false;
    }

    // 비로그인 사용자가 /profile 같은 보호된 페이지 접근 시도할 때
    if (authRoutes.includes(path) && !isLoggedIn) {
      if (routeConfig.getMode() === "hash") {
        window.location.hash = "/login";
      } else {
        window.history.pushState(null, "", "/login");
      }
      handleRoute();
      return false;
    }

    return true;
  };

  // 라우트 이동
  const navigateTo = (path) => {
    if (checkAuth(path)) {
      if (routeConfig.getMode() === "hash") {
        window.location.hash = path;
      } else {
        window.history.pushState(null, "", path);
      }
      handleRoute();
    }
  };

  // 클릭 이벤트 처리
  document.addEventListener("click", (e) => {
    if (e.target.id === "nav-link") {
      e.preventDefault();

      const href = e.target.getAttribute("href");
      navigateTo(href);
    }
  });

  // 라우트 변경 처리 함수
  const handleRouteChange = () => {
    const currentPath = getCurrentPath();
    checkAuth(currentPath);
    handleRoute();
  };

  // 항상 두 이벤트 모두 리스닝
  window.addEventListener("hashchange", handleRouteChange);
  window.addEventListener("popstate", handleRouteChange);

  const init = () => {
    const currentPath = getCurrentPath();
    checkAuth(currentPath);
    handleRoute();
  };

  return {
    getCurrentPath,
    navigateTo,
    init,
  };
})();

export default router;
