// 라우트 관리
const route = () => {
  const getCurrentPath = () => window.location.pathname; // 현재 라우터 확인

  // 라우트 이동
  const navigateTo = (path) => {
    window.history.pushState(null, "", path);
    // 경로가 변경되었다는 커스텀 이벤트 발생
    window.dispatchEvent(new Event("routechange"));
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
    window.dispatchEvent(new Event("routechange"));
  });

  return {
    getCurrentPath,
    navigateTo,
  };
};

export default route();
