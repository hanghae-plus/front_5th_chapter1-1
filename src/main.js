import { userContext } from "./context/userContext.js";
import { renderApp } from "./app.js";
import { handleLinkClick, handlePopState } from "./router/Router.js";

// 로그인 상태 복구
const userData = localStorage.getItem("user");
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const path = localStorage.getItem("path") || "/";

if (userData && isLoggedIn) {
  try {
    const user = JSON.parse(userData);
    userContext.setState({ isLoggedIn: true, user, path });
  } catch (e) {
    console.error("Failed to parse user data:", e);
    alert("사용자 데이터를 불러오는 데 실패했습니다. 다시 로그인해 주세요.");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  }
} else {
  userContext.setState({ isLoggedIn: false, user: null, path });
}

renderApp();

function initializeEventListeners() {
  window.addEventListener("load", () => {
    const initialPath = window.location.pathname;
    userContext.setState({ path: initialPath });
  });

  window.addEventListener("popstate", handlePopState);
  document.addEventListener("click", handleLinkClick);
}

initializeEventListeners();
