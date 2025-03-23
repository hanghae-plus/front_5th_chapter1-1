import { CUSTOM_EVENT, ROUTES } from "./config/index.js";
import ErrorPage from "./routes/error-page.js";
import LoginPage from "./routes/login-page.js";
import MainPage from "./routes/main-page.js";
import ProfilePage from "./routes/profile-page.js";
import store from "./store/index.js";

const render = (url = ROUTES.MAIN) => {
  const username = store.get("username");
  if (!username && url === ROUTES.PROFILE) url = ROUTES.LOGIN;
  if (!!username && url === ROUTES.LOGIN) url = ROUTES.MAIN;
  if (url === ROUTES.PROFILE) return ProfilePage();
  else if (url === ROUTES.LOGIN) return LoginPage();
  else if (url === ROUTES.MAIN) return MainPage();
  else if (url === ROUTES.ERROR) return ErrorPage();
  else return ErrorPage();
};

document.addEventListener(CUSTOM_EVENT.PAGE_PUSH, (e) => {
  if (!e.detail?.url) return;
  const url = e.detail.url;
  root.innerHTML = "";
  root.appendChild(render(url));
  history.pushState({}, "", url);
});

window.onpopstate = () => {
  root.innerHTML = "";
  root.appendChild(render(location.pathname));
};

const root = document.querySelector("#root");
root.appendChild(render());
