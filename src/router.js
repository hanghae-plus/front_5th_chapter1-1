import { getUser, login, logout, updateProfile } from "./auth/auth";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

const routes = {
  "/": MainPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "*": NotFoundPage,
};

export function render() {
  const path = window.location.pathname;
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

export function hashRender() {
  const path = window.location.hash.slice(1) || "/";
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
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
  } else if (e.target.href && e.target.href.includes("#")) {
    e.preventDefault();
    logout();
  } else if (e.target.href) {
    navigate(e.target.href);
  }
}

export function navigate(path) {
  window.history.pushState({}, "", path);
  render();
}

export function initRouter() {
  window.addEventListener("popstate", render);
  window.addEventListener("hashchange", hashRender);
  document.body.addEventListener("click", onClickLink);

  render();
}

export function setupEventListeners() {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const { username } = event.target.elements;
      login({ username: username.value, email: "", bio: "" });
      navigate("/profile");
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
