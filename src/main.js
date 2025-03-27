import { store, handlePopState, navigateTo } from "./store/store";
import { view } from "./view/view";

// 초기 렌더링
view(store.getState());

// 상태 변경 시 자동 렌더링
store.subscribe((state) => {
  view(state);
});

// 페이지 로드 시 초기 설정
window.addEventListener("load", () => {
  const initialPath = window.location.pathname;
  navigateTo(store.dispatch.bind(store), initialPath);
});

// 뒤로가기, 앞으로가기 처리
window.addEventListener("popstate", () => {
  handlePopState(store.dispatch.bind(store));
});

// 링크 클릭 이벤트 처리
document.addEventListener("click", (event) => {
  if (event.target.tagName === "A" && event.target.href) {
    event.preventDefault();
    const path = new URL(event.target.href).pathname;
    navigateTo(store.dispatch.bind(store), path);
  }
});
