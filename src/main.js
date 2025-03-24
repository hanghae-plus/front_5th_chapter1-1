import { ErrorPage } from "./pages/error/page.js";
import { handleSubmitLogin } from "./pages/login/logic.js";
import { LoginPage } from "./pages/login/page.js";
import { MainPage } from "./pages/main/page.js";
import { handleSubmitProfile } from "./pages/profile/logic.js";
import { ProfilePage } from "./pages/profile/page.js";
import { getUserInfoFromStorage } from "./shared/logic/localStorage.js";
import { goTo } from "./shared/logic/router.js";
import { ID } from "./constant.js";

function getHtmlByPathName() {
  const location = window.location.pathname;
  const isLoggedIn = getUserInfoFromStorage();

  switch (location) {
    case "/":
      return MainPage();
    case "/login":
      return LoginPage();
    case "/profile":
      return isLoggedIn ? ProfilePage() : LoginPage();
    default:
      return ErrorPage();
  }
}

function setHtml(html) {
  document.body.innerHTML = `<div id="root">${html}</div>`;
}

export function render() {
  setHtml(getHtmlByPathName());

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
    handleSubmitLogin(event);
  });

  const profileForm = document.getElementById(ID.PROFILE_FORM);
  profileForm?.addEventListener("submit", (event) => {
    handleSubmitProfile(event);
  });
}

window.addEventListener("popstate", render);
render();
