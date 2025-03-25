import { hashRenderRoute, navigateTo } from "./routers/hashRouter";
import { Store } from "./store";

const isProd = location.hostname.includes("github.io");
const BASE_PATH = isProd ? "/front_5th_chapter1-1" : "";

window.addEventListener("hashchange", hashRenderRoute);
window.addEventListener("DOMContentLoaded", hashRenderRoute);

// 링크 클릭 시 페이지 전환 SPA
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-route-link]");
  const logoutBtn = event.target.closest("#logout");

  if (link) {
    event.preventDefault();
    const path = link.getAttribute("href").replace(/^#/, "");
    navigateTo(path);
  }

  if (logoutBtn) {
    event.preventDefault();
    Store.logout();

    location.hash = `${BASE_PATH}/login`;
    hashRenderRoute();
  }
});
