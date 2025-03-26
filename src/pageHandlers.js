import { router } from "./main";
import { BASE_PATH } from "./utils/path";

export const initPageHandlers = (path) => {
  const nav = document.querySelector("#nav");

  if (nav) {
    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        const href = e.target.getAttribute("href");
        window.history.pushState({}, "", `${BASE_PATH}${href}`);
        router();
      }
    });
  }

  if (path === "/login") {
    handleLoginPage();
  } else if (path === "/profile") {
    handleProfilePage();
  }
  handleLogout();
};

const handleLoginPage = () => {
  if (localStorage.getItem("user") !== null) {
    window.history.pushState({}, "", "/");
    router();
  } else {
    const form = document.getElementById("login-form");
    if (form) {
      form.addEventListener("submit", handleLoginSubmit);
    }
  }
};

const handleProfilePage = () => {
  if (!(localStorage.getItem("user") !== null)) {
    window.history.pushState({}, "", "/login");
    router();
  } else {
    const form = document.getElementById("profile-form");
    if (form) {
      form.addEventListener("submit", handleProfileSubmit);
    }
  }
};

const handleLogout = () => {
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogoutClick);
  }
};

const handleProfileSubmit = (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value.trim();
  const userData = { username, email, bio };
  localStorage.setItem("user", JSON.stringify(userData));
  window.history.pushState({}, "", "/profile");
  router();
};

const handleLoginSubmit = (e) => {
  e.preventDefault();
  const userData = { username: "testuser", email: "", bio: "" };
  localStorage.setItem("user", JSON.stringify(userData));
  window.history.pushState({}, "", "/");
  router();
};

const handleLogoutClick = (e) => {
  e.preventDefault();
  localStorage.removeItem("user");
  window.history.pushState({}, "", "/login");
  router();
};
