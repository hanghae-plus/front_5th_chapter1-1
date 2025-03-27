import { userContext } from "../context/userContext.js";

export function navigateTo(path) {
  const baseUrl = "/front_5th_chapter1-1"; // baseUrl 정의
  const fullPath = `${baseUrl}${path}`; // baseUrl 사용
  if (window.location.pathname !== fullPath) {
    window.history.pushState({}, "", fullPath);
    userContext.setState({ path: fullPath });
  }
}
