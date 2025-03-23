import { CUSTOM_EVENT, ROUTES } from "./config/index.js";
import ErrorPage from "./routes/error-page.js";
import LoginPage from "./routes/login-page.js";
import MainPage from "./routes/main-page.js";
import ProfilePage from "./routes/profile-page.js";
import store from "./store/index.js";

const handleLink = (e) => {
  e.preventDefault();
  let url = e.target.getAttribute("href");
  if (url === ROUTES.LOGOUT) {
    store.set({ username: "" });
    url = ROUTES.MAIN;
  }
  const config = { detail: { url }, bubbles: true, cancelable: true };
  document.dispatchEvent(new CustomEvent(CUSTOM_EVENT.PAGE_PUSH, config));
  // 구현중
};

const eventListner = () => {
  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", handleLink);
  });
};

const URL_MAP = {
  [ROUTES.PROFILE]: ProfilePage,
  [ROUTES.LOGIN]: LoginPage,
  [ROUTES.MAIN]: MainPage,
  [ROUTES.ERROR]: ErrorPage,
};

const navigate = (url = ROUTES.MAIN) => {
  const root = document.querySelector("#root");
  const username = store.get("username");
  if (!username && url === ROUTES.PROFILE) url = ROUTES.LOGIN;
  if (!!username && url === ROUTES.LOGIN) url = ROUTES.MAIN;
  history.pushState({}, "", url);
  const page = (URL_MAP[url] || ErrorPage)();
  root.innerHTML = page.template;
  if (page.eventListner) page.eventListner();
  eventListner();
};

document.addEventListener(CUSTOM_EVENT.PAGE_PUSH, (e) => {
  if (!e.detail?.url) return;
  navigate(e.detail.url);
});

window.addEventListener("DOMContentLoaded", () => navigate());
window.onpopstate = () => navigate(location.pathname);
