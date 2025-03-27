import routeConfig from "../config/routerConfig.js";
import userStore from "./userStore.js";

const createRouter = (function () {
  let instance; // 싱글톤 인스턴스

  function initRouter() {
    const getCurrentPath = () => {
      if (routeConfig.getMode() === "hash") {
        const hash = window.location.hash;
        return hash === "" || hash === "#" ? "/" : hash.slice(1);
      }

      // 히스토리 모드 - github 배포를 위함
      const BASE_PATH = "/front_5th_chapter1-1";
      const cleanPath = window.location.pathname.replace(BASE_PATH, "") || "/";

      return cleanPath;
    };

    const authRoutes = ["/profile"];
    const guestRoutes = ["/login"];

    // 라우트 변경 이벤트 감지
    const handleRoute = () => {
      window.dispatchEvent(new Event("routechange"));
    };

    // 인증 체크 함수
    const checkAuth = (path) => {
      const isLoggedIn = userStore.isLoggedIn();

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

    // 라우트 변경 처리 함수
    const handleRouteChange = () => {
      const currentPath = getCurrentPath();
      if (checkAuth(currentPath)) {
        handleRoute();
      }
    };

    // 초기화 함수
    const init = () => {
      // 클릭 이벤트 처리
      document.addEventListener("click", (e) => {
        if (e.target.id === "nav-link") {
          e.preventDefault();

          const href = e.target.getAttribute("href");
          navigateTo(href);
        }
      });

      // 항상 두 이벤트 모두 리스닝
      window.addEventListener("hashchange", handleRouteChange);
      window.addEventListener("popstate", handleRouteChange);

      // 초기 라우트 설정
      const currentPath = getCurrentPath();
      checkAuth(currentPath);
      handleRoute();
    };

    return {
      getCurrentPath,
      navigateTo,
      init,
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = initRouter();
      }
      return instance;
    },
  };
})();

export default createRouter.getInstance();
