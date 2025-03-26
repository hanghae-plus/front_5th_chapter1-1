import { HomePage } from "@/components/HomePage/HomePage.js";
import { handleSubmitLogin } from "@/components/LoginPage/logic.js";
import { LoginPage } from "@/components/LoginPage/LoginPage.js";
import { NotFoundPage } from "@/components/NotFoundPage/NotFoundPage.js";
import { handleSubmitProfile } from "@/components/ProfilePage/logic.js";
import { ProfilePage } from "@/components/ProfilePage/ProfilePage.js";
import { ID } from "@/constant.js";
import { getUserInfoFromStorage } from "@/logic/localStorage.js";
import { goTo } from "@/logic/router.js";
import { setBoldFontToNavigationItem } from "@/components/shared/Navigation/logic.js";

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

  const isLoggedIn = getUserInfoFromStorage();
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

function setEventListeners() {
  //root 요소에 이벤트 리스너를 추가해서 delegation
  document.querySelector("#root").addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault();
      goTo(event.target.href);
    }

    if (event.target.id === ID.LOGOUT_BUTTON) {
      localStorage.removeItem("user");
      goTo("/login");
    }
  });

  const loginForm = document.getElementById(ID.LOGIN_FORM);
  loginForm?.addEventListener("submit", (event) => {
    const loginSuccess = handleSubmitLogin(event);
    loginSuccess && renderPage();
  });

  const profileForm = document.getElementById(ID.PROFILE_FORM);
  profileForm?.addEventListener("submit", (event) => {
    handleSubmitProfile(event);
    renderPage();
  });

  setBoldFontToNavigationItem();
}

export function renderPage() {
  setHtml(getHtmlByPathName());
  setEventListeners();
}

window.addEventListener("popstate", renderPage);
window.addEventListener("hashchange", renderPage);
renderPage();
