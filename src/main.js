import { router, navigate } from "./router/router.js";

// 링크 클릭 이벤트 처리 - 이벤트 위임 적용
document.addEventListener("click", (e) => {
  // 이벤트 위임을 위해 closest 메서드 사용
  const link = e.target.closest("a");
  if (link && !e.defaultPrevented) {
    const href = link.getAttribute("href");
    if (href && href !== "#") {
      e.preventDefault();
      navigate(href);
    }
  }
});

// 브라우저 뒤로가기/앞으로가기 처리
window.addEventListener("popstate", router);

// 초기 라우팅 처리
window.addEventListener("DOMContentLoaded", () => {
  router();
});
