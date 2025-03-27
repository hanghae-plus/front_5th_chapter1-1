import { userContext } from "./context/userContext";
import { renderApp } from "./app";

// 초기 렌더링
function init() {
  // 초기 경로 설정
  const path = window.location.hash.slice(1) || "/";
  userContext.setState({ path });
  renderApp();
}

// 해시 변경 이벤트 핸들러
function handleHashChange() {
  const path = window.location.hash.slice(1);
  userContext.setState({ path });
  renderApp();
}

// 이벤트 리스너 등록
window.addEventListener("hashchange", handleHashChange);
window.addEventListener("DOMContentLoaded", init);

// 링크 클릭 이벤트 처리
document.addEventListener("click", (event) => {
  if (event.target.tagName === "A" && event.target.href) {
    event.preventDefault();
    const path = new URL(event.target.href).hash.slice(1);
    window.location.hash = path; // 해시를 변경하여 경로 설정
  }
});
