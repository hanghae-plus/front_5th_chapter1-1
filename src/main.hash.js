import { setRouteType, renderRoute } from "./main.js";

// hash

// route 타입을 hash로 설정
setRouteType(location.hash, "hash");

// DOM이 준비된 후 routing 처리
document.addEventListener("DOMContentLoaded", () => {
  renderRoute();
});

// hash를 변경했을 때 route 타입 설정 후 routing 처리
window.addEventListener("hashchange", () => {
  setRouteType(location.hash, "hash");
  renderRoute();
});
