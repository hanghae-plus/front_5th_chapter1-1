import User from "./user.js";

import HomePage from "./pages/HomePage.js";
import ProfilePage from "./pages/ProfilePage.js";
import LoginPage from "./pages/LoginPage.js";
import NotFountPage from "./pages/NotFountPage.js";

const routes = {
  "/": () => (document.body.innerHTML = HomePage()),
  "/profile": () => (document.body.innerHTML = ProfilePage()),
  "/login": () => (document.body.innerHTML = LoginPage()),
  "/404": () => (document.body.innerHTML = NotFountPage()),
};

const Router = (function () {
  function navigate(path) {
    location.hash = `#${path}`;
  }

  function hashRouter() {
    const path = location.hash.replace("#", "") || "/";
    const handler = routes[path] || routes["/404"];
    handler();
  }

  function init() {
    window.addEventListener("hashchange", hashRouter);
    window.addEventListener("load", hashRouter);

    document.body.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();

        if (e.target.id === "logout") {
          User.removeUserFromLocalStorage();
          routes["/login"]();
          return;
        }

        navigate(e.target.getAttribute("href").replace("#", ""));
      }
    });

    document.body.addEventListener("submit", function (e) {
      e.preventDefault();
      if (e.target.id === "login-form") {
        const username = document.getElementById("username").value;
        User.createUser(username);
        navigate("/profile");
      } else if (e.target.id === "profile-form") {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const bio = document.getElementById("bio").value;

        User.updateUser({ username, email, bio });
        alert("프로필이 업데이트되었습니다.");
      }
    });
  }

  return { init };
})();

Router.init();
