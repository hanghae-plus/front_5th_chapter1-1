import App from "./main.js";

import store from "./store/store";
const BASE_URL =
  process.env.NODE_ENV === "production" ? "/front_5th_chapter1-1" : "";
const updateRoot = () => {
  document.getElementById("root").innerHTML = App();
};
const isHash = window.location.href.includes("index.hash.html");

const handleFormSubmit = (e) => {
  e.preventDefault();

  if (e.target && e.target.id === "login-form") {
    const username = e.target.querySelector("#username").value;
    store.setUserInfo({ username, email: "", bio: "" });
    isHash
      ? (location.hash = `${BASE_URL}#/profile`)
      : history.pushState(null, "", `${BASE_URL}/profile`);

    updateRoot();
  }

  if (e.target && e.target.id === "profile-form") {
    const username = e.target.querySelector("#username").value;
    const email = e.target.querySelector("#email").value;
    const bio = e.target.querySelector("#bio").value;
    store.setUserInfo({ username, email, bio });
    alert("프로필이 업데이트되었습니다.");
    updateRoot();
  }
};

const handleLogout = (e) => {
  if (e.target && e.target.id === "logout") {
    e.preventDefault();
    store.removeUserInfo();
    isHash
      ? (location.hash = "#/login")
      : history.pushState(null, "", `${BASE_URL}/login`);

    updateRoot();
  }
};

const handleLinkClick = (e) => {
  if (e.target && e.target.nodeName === "A") {
    e.preventDefault();
    isHash
      ? (location.hash = e.target.href.replace(location.origin, ""))
      : history.pushState(null, "", e.target.href.replace(location.origin, ""));
    updateRoot();
  }
};

export const render = () => {
  updateRoot();

  document.getElementById("root").addEventListener("submit", handleFormSubmit);
  document.getElementById("root").addEventListener("click", handleLogout);
  document.getElementById("root").addEventListener("click", handleLinkClick);
};
