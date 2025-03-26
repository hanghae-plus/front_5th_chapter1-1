import { HomePage } from "@/components/HomePage/HomePage.js";
import { handleSubmitLogin } from "@/components/LoginPage/logic.js";
import { LoginPage } from "@/components/LoginPage/LoginPage.js";
import { NotFoundPage } from "@/components/NotFoundPage/NotFoundPage.js";
import { handleSubmitProfile } from "@/components/ProfilePage/logic.js";
import { ProfilePage } from "@/components/ProfilePage/ProfilePage.js";
import { ID } from "@/constant.js";
import { getUserInfoFromStorage } from "@/logic/localStorage.js";
import { goTo } from "@/logic/router.js";

function getHtmlByPathName() {
  let location = window.location.pathname;
  const hash = window.location.hash;
  const isLoggedIn = getUserInfoFromStorage();
  if (hash.includes("#")) {
    const hashLocation = hash.slice(1);
    location = hashLocation;
  }

  switch (location) {
    case "/":
      return HomePage();
    case "/login":
      return isLoggedIn ? HomePage() : LoginPage();
    case "/profile":
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
}
export function renderPage() {
  setHtml(getHtmlByPathName());
  setEventListeners();
}

function render() {
  renderPage();
}

//goTo 함수에서는 pushState로 히스토리를 추가
window.addEventListener("popstate", () => renderPage(window.location.pathname));
window.addEventListener("hashchange", () => renderPage(window.location.hash));
render();
