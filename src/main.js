import { initRouter, navigateTo } from "./routes/router.js";

// goTo 함수를 전역에 노출
window.goTo = function (path) {
  navigateTo(path);
};

// 초기 렌더링
document.addEventListener("DOMContentLoaded", () => {
  initRouter();
});
