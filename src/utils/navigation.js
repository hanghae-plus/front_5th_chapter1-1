import { renderPage } from "./renderer.js";

export const BASE_URL =
  process.env.NODE_ENV === "production" ? "/front_5th_chapter1-1" : "";

export function navigate(url, replaceMode = false) {
  if (window.location.hash) {
    // 해시 라우터
    window.location.hash = url;
  } else {
    // 브라우저 라우터
    const newUrl = BASE_URL + url;
    if (replaceMode) {
      window.history.replaceState({}, "", newUrl);
    } else {
      window.history.pushState({}, "", newUrl);
    }
    renderPage();
  }
}
