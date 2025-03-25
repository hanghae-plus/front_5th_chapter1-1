import { navigateTo, renderRoute } from "./routers/router";
import { Store } from "./store";

const isProd = location.hostname.includes("github.io");
const BASE_PATH = isProd ? "/front_5th_chapter1-1" : "";

// 맨 처음 렌더 시
window.addEventListener("DOMContentLoaded", renderRoute);

// 앞으로 가기 / 뒤로 가기 가능하게 하기
window.addEventListener("popstate", renderRoute);

// 링크 클릭 시 페이지 전환 SPA
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-route-link]");
  const logoutBtn = event.target.closest("#logout");

  // TODO:이슈사항 정리
  if (logoutBtn) {
    event.preventDefault();
    Store.logout();
    history.replaceState(null, "", `${BASE_PATH}/login`);
    renderRoute();
    return;
  }
  if (link) {
    event.preventDefault();
    navigateTo(link.getAttribute("href"));
  }
});
