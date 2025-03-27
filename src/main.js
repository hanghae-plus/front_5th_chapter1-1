import User from "./user.js";

import HomePage from "./pages/HomePage.js";
import ProfilePage from "./pages/ProfilePage.js";
import LoginPage from "./pages/LoginPage.js";
import NotFountPage from "./pages/NotFountPage.js";

const baseUrl =
  process.env.NODE_ENV === "production" ? "/front_5th_chapter1-1" : "";

const Router = (function () {
  const routes = {};

  function addRoute(path, handler) {
    routes[path] = handler;
  }

  function handler(path) {
    const handler = routes[path] || routes["/404"];
    const targetPath = routes[path] ? path : "/404";
    history.pushState(null, "", `${baseUrl}${targetPath}`);
    handler();
  }

  function navigate(path) {
    path = path.replace(baseUrl, "");

    if (!User.isLoggedIn() && path === "/profile") {
      return navigate("/login");
    }
    if (User.isLoggedIn() && path === "/login") {
      return navigate("/");
    }

    handler(path);
  }

  function hashRouter() {
    let path =
      window.location.hash.replace("#", "") || window.location.pathname;
    path = path.replace(baseUrl, "");

    if (!User.isLoggedIn() && path === "/profile") {
      path = "/login";
    }
    if (User.isLoggedIn() && path === "/login") {
      path = "/";
    }

    handler(path);
  }

  function init() {
    window.addEventListener("hashchange", hashRouter);

    window.addEventListener("load", hashRouter);

    window.addEventListener("popstate", () => {
      const path = location.pathname.replace(baseUrl, "");

      if (path === "/login" && User.isLoggedIn()) {
        history.go(1);
        return;
      }

      navigate(path);
    });

    window.addEventListener("click", function (e) {
      const href = e.target.getAttribute("href");

      if (href) {
        e.preventDefault();
        history.pushState(null, "", `#${href}`);

        if (e.target.id === "logout") {
          User.removeUserFromLocalStorage();
          routes["/login"]();
          return;
        }

        const handler = routes[href] || routes["/404"];
        handler();
      }
    });

    window.addEventListener("submit", function (e) {
      e.preventDefault();
      if (e.target.id === "login-form") {
        const username = document.getElementById("username").value;

        User.createUser(username);
        history.pushState(null, "", `#/profile`);
        routes["/profile"]();
      } else if (e.target.id === "profile-form") {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const bio = document.getElementById("bio").value;

        User.updateUser({ username, email, bio });
        alert("프로필이 업데이트되었습니다.");
      }
    });

    navigate(location.pathname);
  }

  return {
    addRoute,
    navigate,
    init,
  };
})();

Router.addRoute("/", () => {
  document.body.innerHTML = HomePage();
});
Router.addRoute("/profile", () => {
  document.body.innerHTML = ProfilePage();
});
Router.addRoute("/login", () => {
  document.body.innerHTML = LoginPage();
});
Router.addRoute("/404", () => {
  document.body.innerHTML = NotFountPage();
});

Router.init();
