import { ErrorPage, LoginPage, MainPage, ProfilePage } from "./template.js";

const ROUTES = {
  MAIN: "/",
  LOGIN: "/login",
  LOGOUT: "/logout",
  PROFILE: "/profile",
  ERROR: "/error",
};

const render = (url = "/") => {
  const username = localStorage.getItem("username");
  const template = document.createElement("template");
  if (url === ROUTES.PROFILE) template.innerHTML = ProfilePage();
  else if (url === ROUTES.LOGIN) template.innerHTML = LoginPage();
  else if (url === ROUTES.MAIN) template.innerHTML = MainPage();
  else if (url === ROUTES.ERROR) template.innerHTML = ErrorPage();
  else template.innerHTML = ErrorPage();
  const content = template.content;

  const loginButton = content.querySelector("li:has(a[href='/login'])");
  const logoutButton = content.querySelector("li:has(a[href='/logout'])");
  const profileButton = content.querySelector("li:has(a[href='/profile'])");

  if (username) {
    if (loginButton) loginButton.style.display = "none";
  } else {
    if (logoutButton) logoutButton.style.display = "none";
    if (profileButton) profileButton.style.display = "none";
  }

  if (url === ROUTES.LOGIN) {
    content.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(e.target);
    });
  }

  content.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      let url = e.target.getAttribute("href");
      if (url === ROUTES.PROFILE && !username) url = ROUTES.LOGIN;
      if (url === ROUTES.LOGOUT) {
        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
        url = ROUTES.MAIN;
      }
      history.pushState({}, "", url);
      root.innerHTML = "";
      root.appendChild(render(url));
    });
  });
  return content;
};

window.onpopstate = () => {
  root.innerHTML = "";
  root.appendChild(render(location.pathname));
};

const root = document.querySelector("#root");
root.appendChild(render());
