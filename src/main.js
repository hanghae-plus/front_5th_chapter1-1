import {
  getUserInfoFromStorage,
  removeUserInfoFromStorage,
} from "@/logic/localStorage.js";
import { HomePage } from "@/components/HomePage/HomePage.js";
import { addEventListenerToLoginForm } from "@/components/LoginPage/logic.js";
import { LoginPage } from "@/components/LoginPage/LoginPage.js";
import { NotFoundPage } from "@/components/NotFoundPage/NotFoundPage.js";
import { addEventListenerToProfileForm } from "@/components/ProfilePage/logic.js";
import { ProfilePage } from "@/components/ProfilePage/ProfilePage.js";
import { ID } from "@/constant.js";
import { goTo } from "@/logic/router.js";
import { setBoldFontToNavigationItem } from "@/components/shared/Navigation/logic.js";
import { addEventListenerToWritePost } from "@/components/HomePage/logic.js";

export let userInfo = null;
export function updateUserInfo() {
  userInfo = getUserInfoFromStorage();
}

export function getPath() {
  const isProduction = process.env.NODE_ENV === "production";
  const base = isProduction ? "/front-5th-chapter1-1" : "/";

  let locationPath = window.location.pathname;
  const hash = window.location.hash;

  if (hash.includes("#")) {
    const hashPath = hash.slice(1);
    locationPath = hashPath;
  }
  console.log("locationPath", locationPath);
  //프로덕션 환경에서는 경로가 다르기 때문에 경로를 변경해줘야 함
  return isProduction ? locationPath.replace(base, "") : locationPath;
}

function getHtmlByPathName() {
  const path = getPath();
  console.log("path", path);
  const isLoggedIn = userInfo;
  switch (path) {
    case "/":
      return HomePage();

    case "/login":
      if (isLoggedIn) {
        window.history.pushState({}, "", "/");
        return HomePage();
      }
      return LoginPage();

    case "/profile":
      if (isLoggedIn) {
        window.history.pushState({}, "", "/profile");
        return ProfilePage();
      }
      return isLoggedIn ? ProfilePage() : LoginPage();

    default:
      return NotFoundPage();
  }
}

function setHtml(html) {
  document.body.innerHTML = `<div id="root">${html}</div>`;
}

function addEventDelegation() {
  document.querySelector("#root").addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault();
      goTo(event.target.href);
    }

    if (event.target.id === ID.LOGOUT_BUTTON) {
      removeUserInfoFromStorage();
      updateUserInfo();
      goTo("/login");
    }
  });
}

function setEventListeners() {
  // root 요소에 이벤트 리스너를 추가해서 delegation
  addEventDelegation();

  // login form 제출 로직
  addEventListenerToLoginForm();

  // profile form 제출 로직
  addEventListenerToProfileForm();

  // navigation item에 bold font 토글
  setBoldFontToNavigationItem();

  // 글 제출 시 post에 추가되는 로직
  addEventListenerToWritePost();
}

export function renderPage() {
  updateUserInfo();
  setHtml(getHtmlByPathName());
  setEventListeners();
}

window.addEventListener("popstate", renderPage);
window.addEventListener("hashchange", renderPage);
renderPage();
