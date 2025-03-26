import { CUSTOM_EVENT, ELEMENT_ID, ROUTES } from "../config";
import ErrorPage from "../pages/error-page.js";
import LoginPage from "../pages/login-page.js";
import MainPage from "../pages/main-page.js";
import ProfilePage from "../pages/profile-page.js";
import store from "../store";

const URL_MAP = {
  [ROUTES.MAIN]: MainPage,
  [ROUTES.LOGIN]: LoginPage,
  [ROUTES.PROFILE]: ProfilePage,
  [ROUTES.ERROR]: ErrorPage,
};

const navigateTo = (page, replace = false) => {
  history[!replace ? "pushState" : "replaceState"](null, null, page);
  render();
};

export const render = () => {
  const root = document.querySelector("#root");
  const { pathname } = location;
  const isLogon = store.isLogon();
  if (pathname === ROUTES.PROFILE && !isLogon)
    return navigateTo(ROUTES.LOGIN, true);
  else if (pathname === ROUTES.LOGIN && isLogon)
    return navigateTo(ROUTES.MAIN, true);
  const page = URL_MAP[pathname] || ErrorPage;
  root.innerHTML = page();
  setEventListener();
};

const setEventListener = () => {
  const root = document.querySelector("#root");
  root.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target.id === ELEMENT_ID.LOGIN_FORM) {
      const formData = new FormData(e.target);
      const username = formData.get("username") || "";
      store.login(username);
      navigateTo(ROUTES.MAIN);
    } else if (e.target.id === ELEMENT_ID.PROFILE_FORM) {
      const formData = new FormData(e.target);
      const username = formData.get("username") || "";
      const email = formData.get("email") || "";
      const bio = formData.get("bio") || "";
      store.setUser({ username, email, bio });
    }
  });
  root.addEventListener("click", (e) => {
    if (e.target.tagName !== "A") return;
    e.preventDefault();
    if (e.target.pathname === ROUTES.LOGOUT) {
      store.logout();
      navigateTo(ROUTES.LOGIN);
      return;
    }
    navigateTo(e.target.pathname);
  });
  root.addEventListener(CUSTOM_EVENT.PAGE_PUSH, (e) => {
    if (!e.detail.url) return;
    navigateTo(e.detail.url);
  });
};

window.addEventListener("popstate", render);
render();
