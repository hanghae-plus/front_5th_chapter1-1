import { hashRouter, navigate } from "./router/hashRouter.js";

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

// 브라우저 해시 변경 처리
window.addEventListener("hashchange", hashRouter);

// 초기 라우팅 처리
window.addEventListener("DOMContentLoaded", () => {
  // 초기 해시가 없으면 기본 경로로 설정
  if (!window.location.hash) {
    navigate("/");
  } else {
    hashRouter();
  }
});
