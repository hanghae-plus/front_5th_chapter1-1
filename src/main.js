import { App } from "./App";
import { browserRouter } from "./utils/router";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "./utils/storage";

const handleClick = (event) => {
  const { target } = event;

  const isLogout = target.id === "logout";
  if (isLogout) {
    event.preventDefault();
    removeLocalStorage("user");
  }

  const isLink = target.tagName === "A" && target.href;
  if (isLink) {
    browserRouter(target.href, render);
  }
};

const handleLogin = (username) => {
  setLocalStorage("user", { username, email: "", bio: "" });
  browserRouter("/", render);
};

const handleProfileUpdate = (username) => {
  const email = document.getElementById("email")?.value?.trim();
  const bio = document.getElementById("bio")?.value?.trim();

  setLocalStorage("user", { username, email, bio });
  alert("프로필이 업데이트 되었습니다.");
};

const handleSubmit = (event) => {
  event.preventDefault();

  const username = document.getElementById("username")?.value?.trim();
  if (!username) return;

  if (event.target.id === "login-form") {
    handleLogin(username);
  }

  if (event.target.id === "profile-form") {
    handleProfileUpdate(username);
  }
};

export const render = () => {
  const user = getLocalStorage("user");
  const isHashRouter = location.hash;
  const currentPath = isHashRouter ? location.hash.slice(1) : location.pathname;

  if (!user && currentPath === "/profile") {
    browserRouter("/login", render);
  }

  if (user && currentPath === "/login") {
    browserRouter("/", render);
  }

  document.body.innerHTML = `<div id="root">${App({ user })}</div>`;
  document.body.addEventListener("click", handleClick);
  document.body.addEventListener("submit", handleSubmit);
};

window.addEventListener("popstate", render);
window.addEventListener("hashchange", render);

render();
