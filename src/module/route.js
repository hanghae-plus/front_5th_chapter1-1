import user from "./user";

// 라우트 관리
const route = (function () {
  const getCurrentPath = () => window.location.pathname; // 현재 라우터 확인

  // 보호할 라우터
  const authRoutes = ["/profile"];

  // 라우트 변경 이벤트
  const handleRoute = () => {
    window.dispatchEvent(new Event("routechange"));
  };

  // 인증 체크 함수
  const checkAuth = (path) => {
    // 보호할 라우터가 아니면 통과
    if (!authRoutes.includes(path)) {
      return true;
    }

    const { isLoggedIn } = user();
    if (!isLoggedIn) {
      window.history.pushState(null, "", "/login");
      handleRoute();
      return false;
    }

    return true;
  };

  // 라우트 이동
  const navigateTo = (path) => {
    if (checkAuth(path)) {
      window.history.pushState(null, "", path);
      handleRoute();
    }
  };

  // 라우트 리플레이스 - 대체
  const replaceTo = (path) => {
    window.history.replaceState(null, "", path);
    handleRoute();
  };

  // 클릭 이벤트 처리
  document.addEventListener("click", (e) => {
    if (e.target.id === "nav-link") {
      e.preventDefault();

      const href = e.target.getAttribute("href");
      navigateTo(href);
    }
  });

  // 브라우저 뒤로가기/앞으로가기 처리
  window.addEventListener("popstate", () => {
    const currentPath = getCurrentPath();
    checkAuth(currentPath);
    handleRoute();
  });

  const init = () => {
    const currentPath = getCurrentPath();
    checkAuth(currentPath);
    handleRoute();
  };

  return {
    getCurrentPath,
    navigateTo,
    replaceTo,
    init,
  };
})();

export default route;
