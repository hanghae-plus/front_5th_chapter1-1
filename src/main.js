import { LoginPage } from "./pages/login/page.js";
import { MainPage } from "./pages/main/page.js";
import { ProfilePage } from "./pages/profile/page.js";
import { ErrorPage } from "./pages/error/page.js";

function getPathName() {
  return location.pathname;
}

function getUserInfoFromStorage() {
  return localStorage.getItem("user");
}

function getHtmlByPathName(location) {
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

function render() {
  const pathName = getPathName();
  const html = getHtmlByPathName(pathName);
  setHtml(html);
}

window.addEventListener("popstate", render);
render();
