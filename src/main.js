import Layout from "./components/layout.js";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "./utils/stroage.js";
import { getCurrentPath, pathPrefix } from "./utils/route.js";

import { attachLoginHandler } from "./login.js";
import { profileConfimHandler } from "./components/ProfilePage.js";

import { auth } from "./store/user.js";
import { App } from "./App.js";

// 해시가 없는 상태에서 진입했을 때 자동으로 #/ 붙이기
// if (!location.hash) {
//   location.replace(location.pathname + location.search + "#/");
// }

// popstate 이벤트로 뒤/앞 이동 지원
window.addEventListener("popstate", () => {
  render();
});

export const render = () => {
  const root = document.getElementById("root");
  if (!root) return;

  auth.loggedIn = !!getLocalStorageItem("user");
  auth.user = getLocalStorageItem("user") || null;

  const pageContent = App();
  root.innerHTML = Layout(pageContent);

  const path = getCurrentPath(); // ✅ 이제 base 제거된 경로가 들어옴

  console.log("path=>", path);

  // ✅ 핸들러 연결 조건 수정
  if (path === "/login") {
    attachLoginHandler();
  }
  if (path === "/profile") {
    profileConfimHandler();
  }

  // ✅ SPA 링크 클릭 처리
  document.addEventListener("click", (e) => {
    const target = e.target.closest("a");
    if (!target || !target.getAttribute("href")) return;
    if (e.defaultPrevented) return;

    const href = target.getAttribute("href");

    if (href.startsWith("#")) {
      // 해시 라우터
      e.preventDefault();
      location.hash = href;
    } else if (href.startsWith(pathPrefix())) {
      // 기본 라우터
      e.preventDefault();
      history.pushState(null, "", href);
      render();
    }
  });

  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      removeLocalStorageItem("user");
      auth.loggedIn = false;
      auth.user = null;
      history.pushState(null, "", pathPrefix() + "/login");
      render();
    });
  }
};

// 최초 렌더링
render();
