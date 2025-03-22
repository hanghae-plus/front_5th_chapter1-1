import { CUSTOM_EVENT, ROUTES } from "./config/index.js";
import LoginPage from "./routes/login-page.js";
import MainPage from "./routes/main-page.js";
import ProfilePage from "./routes/profile-page.js";
import { ErrorPage } from "./template.js";

const render = (url = "/") => {
  const template = document.createElement("template");
  if (url === ROUTES.PROFILE) return ProfilePage();
  else if (url === ROUTES.LOGIN) return LoginPage();
  else if (url === ROUTES.MAIN) return MainPage();
  else if (url === ROUTES.ERROR) template.innerHTML = ErrorPage();
  else template.innerHTML = ErrorPage();
  const content = template.content;
  return content;
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
  // history.pushState({}, "", location.pathname);
};

const root = document.querySelector("#root");
root.appendChild(render());
