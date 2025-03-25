import { hashRenderRoute, navigateTo } from "./routers/hashRouter";

window.addEventListener("hashchange", hashRenderRoute);
window.addEventListener("DOMContentLoaded", hashRenderRoute);

// 링크 클릭 시 페이지 전환 SPA
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-route-link]");
  if (link) {
    event.preventDefault();
    const path = link.getAttribute("href").replace(/^#/, "");
    navigateTo(path);
  }
});
