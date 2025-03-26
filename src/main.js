import { CUSTOM_EVENT, ELEMENT_ID, ROUTES } from "./config/index.js";
import ErrorPage from "./routes/error-page.js";
import LoginPage from "./routes/login-page.js";
import MainPage from "./routes/main-page.js";
import ProfilePage from "./routes/profile-page.js";
import store from "./store/index.js";

const PREFIX = "/front_5th_chapter1-1";

const handleLink = (e) => {
  e.preventDefault();
  let url = e.target.getAttribute("href");
  if (url === ROUTES.LOGOUT) {
    localStorage.removeItem("user");
    url = ROUTES.LOGIN;
  } else if (url === ROUTES.LOGIN) {
    if (store.get("username")) url = ROUTES.MAIN;
  }
  const config = { detail: { url }, bubbles: true, cancelable: true };
  document.dispatchEvent(new CustomEvent(CUSTOM_EVENT.PAGE_PUSH, config));
};

const eventListener = () => {
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

const navigate = () => {
  let url = location.pathname;
  const username = store.isLogon();
  if (!username && url === ROUTES.PROFILE) url = ROUTES.LOGIN;
  if (!!username && url === ROUTES.LOGIN) url = ROUTES.MAIN;
  if (!url.includes(PREFIX)) url = PREFIX + url;
  history.replaceState({}, "", url);
  render(url);
};

const render = (url) => {
  const key = url.replace(PREFIX, "");
  const page = (URL_MAP[key] || ErrorPage)();
  const root = document.querySelector("#root");
  root.innerHTML = page.template;
  eventListener();
};

// 로그인에서도 커스텀 이벤트로 페이지 이동
document.addEventListener(CUSTOM_EVENT.PAGE_PUSH, (e) => {
  if (!e.detail.url) return;
  history.pushState({}, "", e.detail.url);
  navigate();
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.id === ELEMENT_ID.LOGIN_FORM) {
    const formData = new FormData(e.target);
    const username = formData.get("username") || "";
    const data = { username, email: "", bio: "" };
    localStorage.setItem("user", JSON.stringify(data));
    store.set(data);
    const url = ROUTES.MAIN;
    const config = { detail: { url }, bubbles: true, cancelable: true };
    document.dispatchEvent(new CustomEvent(CUSTOM_EVENT.PAGE_PUSH, config));
  } else if (e.target.id === ELEMENT_ID.PROFILE_FORM) {
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username") || "",
      email: formData.get("email") || "",
      bio: formData.get("bio") || "",
    };
    localStorage.setItem("user", JSON.stringify(data));
    store.set(data);
    const url = ROUTES.PROFILE;
    const config = { detail: { url }, bubbles: true, cancelable: true };
    document.dispatchEvent(new CustomEvent(CUSTOM_EVENT.PAGE_PUSH, config));
  }
});

// 기본 페이지 이동, DOM 로드 이벤트 변경..
window.addEventListener("storage", store.sync());
window.addEventListener("popstate", navigate);
window.addEventListener("DOMContentLoaded", navigate);
