import App from "./main.hash.js";
import store from "./store/store";
import { BASE_URL } from "./util/constants.js";

const updateRoot = () => {
  document.getElementById("root").innerHTML = App();
};
const handleFormSubmit = (e) => {
  e.preventDefault();

  if (e.target && e.target.id === "login-form") {
    const username = e.target.querySelector("#username").value;
    store.setUserInfo({ username, email: "", bio: "" });
    location.hash = `${BASE_URL}#/profile`;

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
    location.hash = "#/login";

    updateRoot();
  }
};

const handleLinkClick = (e) => {
  if (e.target && e.target.nodeName === "A") {
    e.preventDefault();

    location.hash = e.target.href.replace(location.origin, "");

    updateRoot();
  }
};

export const render = () => {
  updateRoot();

  document.getElementById("root").addEventListener("submit", handleFormSubmit);
  document.getElementById("root").addEventListener("click", handleLogout);
  document.getElementById("root").addEventListener("click", handleLinkClick);
};
