import "./main.js";
import { store, actions } from "./store/store";
import { view } from "./view/view";

// 초기 렌더링
function init() {
  // 초기 경로 설정
  const path = window.location.hash.slice(1) || "/";
  store.dispatch(actions.setPath(path));
  view(store.getState());
}

// 해시 변경 이벤트 핸들러
function handleHashChange() {
  const path = window.location.hash.slice(1);
  store.dispatch(actions.setPath(path));
  view(store.getState());
}

// 이벤트 리스너 등록
window.addEventListener("hashchange", handleHashChange);
window.addEventListener("DOMContentLoaded", init);
