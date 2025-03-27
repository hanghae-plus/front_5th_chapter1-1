import { MainPage } from "../components/MainPage";
import { LoginPage } from "../components/LoginPage";
import { ProfilePage } from "../components/ProfilePage.js";
import { ErrorPage } from "../components/ErrorPage.js";
import {
  getUser,
  setUser,
  removeUser,
  updateProfile,
} from "../common/store.js";

const base = import.meta.env.BASE_URL;

export const routes = {
  [`${base}#/`]: MainPage,
  [`${base}#/login`]: LoginPage,
  [`${base}#/profile`]: ProfilePage,
};

export const Router = {
  render: () => {
    console.log("base", base);
    document.body.innerHTML = '<div id="root"></div>';
    const root = document.getElementById("root");
    const currentUser = getUser();
    let path = window.location.hash;
    console.log("hashpath", `${base}${path}`);
    const page = routes[`${base}${path}`] || ErrorPage;
    root.innerHTML = page.render();

    if (page.afterRender) {
      page.afterRender();
    }
    if (path === "#/profile" && !currentUser) {
      console.log(currentUser);
      location.hash = "#/login";
      Router.render();
    }
    if (path === "#/login" && currentUser) {
      location.hash = "#/";
      Router.render();
    }

    // 이벤트 위임 방식으로 변경
    root.addEventListener("click", (e) => {
      if (e.target.matches("a")) {
        e.preventDefault();
        if (e.target && e.target.id === "logout") {
          removeUser();
          Router.navigate("#/login");
          return;
        }
        const targetPath = e.target.getAttribute("href");
        console.log("targetPath", targetPath);
        location.hash = `${targetPath}`;
        Router.render();
      }
    });

    root.addEventListener("submit", (e) => {
      if (e.target && e.target.id === "login-form") {
        e.preventDefault();
        let userName = document.getElementById("username").value;
        console.log(userName); //ok
        // localStorage에 정보 저장
        setUser(userName);
        Router.navigate("#/");
      }
      if (e.target && e.target.id === "profile-form") {
        e.preventDefault();
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let bio = document.getElementById("bio").value;
        console.log(email, bio);
        updateProfile(username, email, bio);
      }
    });
  },
  navigate: (path) => {
    location.hash = path;
    Router.render();
  },
};
