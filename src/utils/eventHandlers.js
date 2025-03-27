import { setLocalStorageItem, removeLocalStorageItem } from "./storage.js";
import auth from "../store/auth.js";

function handleLogin(router) {
  const username = document.getElementById("username").value;

  const userData = {
    username,
    email: "",
    bio: "",
  };

  setLocalStorageItem("user", userData);
  auth.setUserInfo(userData);

  router.changeRoute("/");
}

function handleLogout(router) {
  removeLocalStorageItem("user");
  auth.clearUserInfo();

  router.changeRoute("/profile");
}

function handleProfile(router) {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;

  const userData = { username, email, bio };

  setLocalStorageItem("user", userData);
  auth.setUserInfo(userData);

  router.changeRoute("/profile");
}

function setupEventListeners(router) {
  window.addEventListener("submit", (event) => {
    event.preventDefault();

    if (event.target.id === "login-form") {
      handleLogin(router);
    }

    if (event.target.id === "profile-form") {
      handleProfile(router);
    }
  });

  window.addEventListener("click", (event) => {
    if (event.target.id === "logout") {
      handleLogout(router);
    }
  });
}

export { handleLogin, handleLogout, handleProfile, setupEventListeners };
