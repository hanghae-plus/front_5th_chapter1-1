// src/main.hash.js
import Layout from "./components/layout.js";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "./utils/stroage.js";
import { attachLoginHandler } from "./login.js";
import { profileConfimHandler } from "./components/ProfilePage.js";
import { auth } from "./store/user.js";
import { App } from "./App.js";
import { getCurrentPath } from "./utils/route.js";

export const render = () => {
  const root = document.getElementById("root");
  if (!root) return;

  // 로그인 동기화
  auth.loggedIn = !!getLocalStorageItem("user");
  auth.user = getLocalStorageItem("user");

  const pageContent = App();
  root.innerHTML = Layout(pageContent);

  document.addEventListener("click", (e) => {
    const target = e.target.closest("a");
    if (!target || !target.getAttribute("href")) return;
    if (e.defaultPrevented) return;

    const href = target.getAttribute("href");
    if (!href.startsWith("#")) return;

    e.preventDefault();
    location.hash = href;
  });

  const path = getCurrentPath();
  if (path === "/login") attachLoginHandler();
  if (path === "/profile") profileConfimHandler();

  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      removeLocalStorageItem("user");
      auth.loggedIn = false;
      auth.user = null; // ✅ 이 줄 추가!
      location.hash = "#/";
    });
  }
};

window.addEventListener("DOMContentLoaded", render);
window.addEventListener("hashchange", render);
