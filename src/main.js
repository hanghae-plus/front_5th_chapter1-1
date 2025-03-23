import { CUSTOM_EVENT, ROUTES } from "./config/index.js";
import ErrorPage from "./routes/error-page.js";
import LoginPage from "./routes/login-page.js";
import MainPage from "./routes/main-page.js";
import ProfilePage from "./routes/profile-page.js";
import store from "./store/index.js";

const navigate = (e) => {
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
    el.addEventListener("click", navigate);
  });
};

const URL_MAP = {
  [ROUTES.PROFILE]: ProfilePage,
  [ROUTES.LOGIN]: LoginPage,
  [ROUTES.MAIN]: MainPage,
  [ROUTES.ERROR]: ErrorPage,
};

const getTemplate = (url = ROUTES.MAIN) => {
  return (URL_MAP[url] || ErrorPage)();
};

document.addEventListener(CUSTOM_EVENT.PAGE_PUSH, (e) => {
  if (!e.detail?.url) return;
  let url = e.detail.url;
  const username = store.get("username");
  if (!username && url === ROUTES.PROFILE) url = ROUTES.LOGIN;
  if (!!username && url === ROUTES.LOGIN) url = ROUTES.MAIN;
  history.pushState({}, "", url);
  const page = getTemplate(url);
  root.innerHTML = page.template;
  if (page.eventListner) page.eventListner();
  eventListner();
});

window.onpopstate = () => {
  const page = getTemplate(location.pathname);
  root.innerHTML = page.template;
  if (page.eventListner) page.eventListner();
  eventListner();
};

const root = document.querySelector("#root");
const page = getTemplate();
root.innerHTML = page.template;
if (page.eventListner) page.eventListner();
eventListner();
