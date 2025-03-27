import { state } from "./state";
import { ProfilePage, editProfile } from "./page/profile";
import { ErrorPage } from "./page/error";
import { LoginPage, btnLogin, btnLogout } from "./page/login";
import { MainPage } from "./page/mainPage";

const container = document.querySelector("#root");
//const isProduction = import.meta.env.MODE === "production";
//const BASE = isProduction ? "/front_5th_chapter1-1" : "";

const pages = {
  [`/`]: () => MainPage(),
  [`/login`]: () => LoginPage(),
  [`/profile`]: () => ProfilePage(),
  "*": () => ErrorPage(),
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (e.target.id === "profile-form") {
    editProfile();
  }

  if (e.target.id === "login-form") {
    btnLogin();
    window.location.hash = `#/`;
    render();
  }
};

const handleClick = (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();

    const path = e.target.href.replace(location.origin, "");

    if (e.target.id === "logout") {
      btnLogout();
      window.location.hash = `#/login`;
      render();
    } else {
      window.location.hash = `#${path}`;
    }

    render();
  }
};

const render = () => {
  const path = window.location.hash.slice(1) || "/";

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log("path: ", path);

  let component;

  state.isLogin = !!localStorage.getItem("user");

  if (user && path === "/login") {
    component = pages["/login"];
  } else if (!state.isLogin && path === "/profile") {
    component = pages["/login"];
  } else {
    component = pages[path] || pages["*"];
  }

  container.innerHTML = component();

  document.body.removeEventListener("submit", handleSubmit);
  document.body.removeEventListener("click", handleClick);

  document.body.addEventListener("submit", handleSubmit);
  document.body.addEventListener("click", handleClick);
};

render();
window.addEventListener("hashchange", render);
