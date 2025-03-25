import { navigateTo, handlePopState } from "./update/update";

// 페이지 로드 시 초기 경로 설정
window.addEventListener("load", () => {
  // 페이지 로드 시 경로에 맞는 렌더링
  const initialPath = window.location.pathname;
  navigateTo(initialPath);
});

// 뒤로가기, 앞으로가기 시 경로 변경 처리
window.addEventListener("popstate", handlePopState);

// 링크 클릭 이벤트 처리
document.addEventListener("click", (event) => {
  if (event.target.tagName === "A" && event.target.href) {
    event.preventDefault(); // 기본 링크 동작 방지
    const path = new URL(event.target.href).pathname;
    navigateTo(path);
  }
});
