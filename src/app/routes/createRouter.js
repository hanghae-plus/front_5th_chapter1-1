export function createRouter(rootElement, { isHashMode = false } = {}) {
  const routes = {}; // path와 handler를 저장할 객체
  let currentPath = "";

  // 현재 경로 반환
  function getCurrentPath() {
    if (isHashMode) {
      return window.location.hash.replace(/^#/, "") || "/";
    } else {
      return window.location.pathname || "/";
    }
  }

  // 해당 경로의 handler 실행 (없으면 404 처리)
  function handleRoute(path) {
    const handler = routes[path];
    if (handler) {
      handler(rootElement);
    } else if (routes["404"]) {
      routes["404"](rootElement);
    }
  }

  // 경로 변경 시 라우트 처리
  function handleRouteChange() {
    currentPath = getCurrentPath();
    handleRoute(currentPath);
  }

  // 라우트 이동
  function navigateTo(path) {
    if (isHashMode) {
      window.location.hash = path;
    } else {
      history.pushState({}, "", path);
      handleRouteChange();
    }
  }

  // 라우트 등록
  function addRoute(path, handler) {
    routes[path] = handler;
  }

  // 라우터 시작 (초기 진입 및 이벤트 리스너 등록)
  function start() {
    currentPath = getCurrentPath();
    handleRoute(currentPath);

    if (isHashMode) {
      window.addEventListener("hashchange", handleRouteChange);
      window.addEventListener("popstate", handleRouteChange);
    } else {
      window.addEventListener("popstate", handleRouteChange);
    }
  }

  return {
    addRoute,
    navigateTo,
    start,
    getCurrentPath,
  };
}
