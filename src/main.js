import { navigateTo, renderRoute } from "./routers/router";

// 맨 처음 렌더 시
window.addEventListener("DOMContentLoaded", renderRoute);

// 앞으로 가기 / 뒤로 가기 가능하게 하기
window.addEventListener("popstate", renderRoute);

// 링크 클릭 시 페이지 전환 SPA
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-route-link]");
  if (link) {
    event.preventDefault();
    navigateTo(link.getAttribute("href"));
  }
});
