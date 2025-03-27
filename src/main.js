import { HomePage } from "@/components/HomePage/HomePage.js";
import { addEventListenerToLoginForm } from "@/components/LoginPage/logic.js";
import { LoginPage } from "@/components/LoginPage/LoginPage.js";
import { NotFoundPage } from "@/components/NotFoundPage/NotFoundPage.js";
import { addEventListenerToProfileForm } from "@/components/ProfilePage/logic.js";
import { ProfilePage } from "@/components/ProfilePage/ProfilePage.js";
import { ID } from "@/constant.js";
import {
  getUserInfoFromStorage,
  removeUserInfoFromStorage,
} from "@/logic/localStorage.js";
import { goTo } from "@/logic/router.js";
import { setBoldFontToNavigationItem } from "@/components/shared/Navigation/logic.js";

export let userInfo = null;
export function updateUserInfo() {
  userInfo = getUserInfoFromStorage();
}

export function getPath() {
  let locationPath = window.location.pathname;
  const hash = window.location.hash;

  if (hash.includes("#")) {
    const hashPath = hash.slice(1);
    locationPath = hashPath;
  }

  return locationPath;
}

function getHtmlByPathName() {
  const path = getPath();

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
  // login form에 이벤트 리스너 추가
  addEventListenerToLoginForm();
  // profile form에 이벤트 리스너 추가
  addEventListenerToProfileForm();
  // navigation item에 bold font 토글
  setBoldFontToNavigationItem();
}

export function renderPage() {
  updateUserInfo();
  setHtml(getHtmlByPathName());
  setEventListeners();
}

window.addEventListener("popstate", renderPage);
window.addEventListener("hashchange", renderPage);
renderPage();
