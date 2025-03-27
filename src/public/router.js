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
  [`${base}`]: MainPage,
  [`${base}login`]: LoginPage,
  [`${base}profile`]: ProfilePage,
};

export const Router = {
  render: () => {
    console.log(base);
    document.body.innerHTML = '<div id="root"></div>';
    const root = document.getElementById("root");
    const currentUser = getUser();
    let path = window.location.pathname;
    console.log("path2?", path);
    const page = routes[path] || ErrorPage;
    root.innerHTML = page.render();

    if (page.afterRender) {
      page.afterRender();
    }
    if (path === `${base}profile` && !currentUser) {
      history.replaceState(null, "", "/login");
      Router.render();
    }
    if (path === `${base}login` && currentUser) {
      history.replaceState(null, "", "/");
      Router.render();
    }

    // 이벤트 위임 방식으로 변경
    root.addEventListener("click", (e) => {
      if (e.target.matches("a")) {
        e.preventDefault();
        if (e.target && e.target.id === "logout") {
          removeUser();
          Router.navigate(`${base}login`);
          return;
        }
        const targetPath = e.target.getAttribute("href").replace(/^\//, "");
        console.log("targetpath", targetPath)
        history.pushState(null, "", `${base}${targetPath}`);
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
        Router.navigate(`${base}`);
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
    console.log("navigate!", path);
    history.pushState(null, "", path);
    Router.render();
  },
};
