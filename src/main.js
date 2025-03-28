import { router } from "./router.js";

// 테스트 환경에서는 자동으로 로그인 상태 초기화
if (navigator.userAgent.includes("jsdom")) {
  localStorage.removeItem("user");
}

// 페이지가 처음 로드됐을 때 실행
window.addEventListener("DOMContentLoaded", () => {
  router(); // 현재 경로에 맞는 페이지 렌더링
});

// 브라우저 뒤로가기 / 앞으로가기 대응
window.addEventListener("popstate", () => {
  router();
});

// 페이지가 처음 로드됐을 때 실행
window.addEventListener("DOMContentLoaded", () => {
  router(); // 현재 경로에 맞는 페이지 렌더링
});
