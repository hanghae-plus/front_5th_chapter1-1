import { CUSTOM_EVENT, ELEMENT_ID, ROUTES } from "../config";
import ErrorPage from "../pages/error-page.js";
import LoginPage from "../pages/login-page.js";
import MainPage from "../pages/main-page.js";
import ProfilePage from "../pages/profile-page.js";
import store from "../store";

const URL_MAP = {
  ["#" + ROUTES.MAIN]: MainPage,
  ["#" + ROUTES.LOGIN]: LoginPage,
  ["#" + ROUTES.PROFILE]: ProfilePage,
  ["#" + ROUTES.ERROR]: ErrorPage,
};

const navigate = (hash) => {
  if (!hash.includes("#")) hash = "#" + hash;
  location.hash = hash;
  render();
};

export const render = () => {
  const root = document.querySelector("#root");
  let { hash } = location;
  const isLogon = store.isLogon();
  if (!hash) hash = "#" + ROUTES.MAIN;
  if (hash === "#" + ROUTES.PROFILE && !isLogon) return navigate(ROUTES.LOGIN);
  else if (hash === "#" + ROUTES.LOGIN && isLogon) return navigate(ROUTES.MAIN);
  const page = URL_MAP[hash] || ErrorPage;
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
      navigate(ROUTES.MAIN);
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
      navigate(ROUTES.LOGIN);
      return;
    }
    navigate(e.target.pathname);
  });
  root.addEventListener(CUSTOM_EVENT.PAGE_PUSH, (e) => {
    if (!e.detail.url) return;
    navigate(e.detail.url);
  });
};

window.addEventListener("hashchange", render);
render();
