import { baseURL, renderPage } from "./helper/route.js";

//  popstate의 경우 (popstate가 발생하는 시점에서는 이미 브라우저가 이전상태로 바뀌어있음).  url path가 이미 변경됨.. 따로 pushstate 할 필요없음.
window.addEventListener('popstate', () => {
  renderPage();
});
// hashchange는 hash route가 변경됨을 감지, 브라우저의 뒤로가기, 앞으로가기도 여기서 감지됨.
window.addEventListener('hashchange', () => {
  renderPage();
});
window.addEventListener('DOMContentLoaded', () => {
  if (!location.hash && location.pathname === `/index.hash.html`) {
    // 해시 라우팅 (index.hash.html) 진입일 때
    history.replaceState({}, '', `/index.hash.html#${baseURL}`);
    renderPage();
  } else {
    renderPage();
  }
});
