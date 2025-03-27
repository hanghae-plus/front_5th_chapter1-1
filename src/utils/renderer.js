import ErrorPage from "../pages/ErrorPage";
import routes from "./routes";

const HASH_SLICE_COUNT = 1;

function getCurPath() {
  const basePath = "/front_5th_chapter1-1";
  if (window.location.hash) {
    // 해시 라우터
    return window.location.hash.slice(HASH_SLICE_COUNT) || "/";
  }
  // 브라우저 라우터
  return window.location.pathname.replace(basePath, "") || "/";
}

// 페이지 렌더링 함수
export function renderPage() {
  const path = getCurPath();
  const root = document.getElementById("root");
  const page = routes[path] || ErrorPage;
  root.innerHTML = page();
}
