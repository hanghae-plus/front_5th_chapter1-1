import { userContext } from "../context/userContext.js";
import { navigateTo } from "./navigate.js";

// 뒤로가기 / 앞으로가기 이벤트
export function handlePopState() {
  const path = window.location.pathname;
  userContext.setState({ path });
}

// a 태그 클릭 감지
export function handleLinkClick(event) {
  const target = event.target.closest("a");
  if (target && target.matches("a[data-link]")) {
    event.preventDefault();
    const href = target.getAttribute("href");
    if (href) navigateTo(href);
  }
}
