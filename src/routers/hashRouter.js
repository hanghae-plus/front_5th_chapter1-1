import { getUser, login, logout, updateProfile } from "../auth/auth";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";

const routes = {
  "/": MainPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "*": NotFoundPage,
};

export function hashRender() {
  const path = window.location.hash.replace("#", "");

  let component;
  const user = getUser();

  if (user && path === "/login") {
    component = routes["/"];
  } else if (!user && path === "/profile") {
    component = routes["/login"];
  } else {
    component = routes[path] || routes["*"];
  }
  const $app = document.querySelector("#root");
  $app.innerHTML = component();

  setupEventListeners();
}

export function onClickLink(e) {
  const target = e.target.closest("a");
  if (!target) return;

  const path = target.href.replace(location.origin, "");
  e.preventDefault();
  if (target.id === "logout") {
    logout();
    location.hash = `#/login`;
  } else {
    location.hash = path;
  }
}

export function initHashRouter() {
  window.addEventListener("hashchange", hashRender);
  document.body.addEventListener("click", onClickLink);

  hashRender();
}

export function navigate(path) {
  window.location.hash = path;
}

export function setupEventListeners() {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const { username } = event.target.elements;
      login({ username: username.value, email: "", bio: "" });
      navigate("#/profile");
    });
  }

  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const { username, email, bio } = event.target.elements;
      updateProfile({
        username: username.value,
        email: email.value,
        bio: bio.value,
      });
    });
  }
}
