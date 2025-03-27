import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { ProfilePage } from "./components/ProfilePage";
import { NotFoundPage } from "./components/NotFoundPage";

// 로그인 여부 확인
const isLogIn = () => {
  return localStorage.getItem("user");
};

export const Router = () => {
  // 현재 페이지 URL 가져오기
  // pathname 이란, https://naver.com/login 에서 /login 부분.
  // const path = window.location.pathname;

  let layout = "";

  // history api
  if (window.location.pathname) {
    const path = window.location.pathname;
    switch (path) {
      case "/":
        layout = `${Header()}${HomePage()}${Footer()}`;
        break;
      case "/login":
        layout = `${LoginPage()}`;
        break;
      case "/profile":
        if (isLogIn()) {
          layout = `${Header()}${ProfilePage()}${Footer()}`;
        } else {
          window.history.pushState({}, "", "/login");
          layout = `${LoginPage()}`;
        }
        break;
      default:
        layout = `${NotFoundPage()}`;
        break;
    }
  }

  // hash
  if (window.location.hash) {
    const hash = window.location.hash;
    // const hash = window.location + '#/';

    switch (hash) {
      case "#/":
        layout = `${Header()}${HomePage()}${Footer()}`;
        break;
      case "#/login":
        if (isLogIn()) {
          window.history.hash = "#/";
          layout = `${Header()}${HomePage()}${Footer()}`;
        } else {
          layout = `${LoginPage()}`;
        }
        break;
      case "#/profile":
        if (isLogIn()) {
          layout = `${Header()}${ProfilePage()}${Footer()}`;
        } else {
          window.history.hash = "#/login";
          layout = `${LoginPage()}`;
        }
        break;
      default:
        layout = `${NotFoundPage()}`;
        break;
    }
  }

  document.getElementById("root").innerHTML = layout;

  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("user");
      goTo("/");
    });
  }

  const profileForm = document.getElementById("profile-form");

  if (profileForm) {
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const bioInput = document.getElementById("bio").value;
      const user = JSON.parse(localStorage.getItem("user"));
      user.email = email;
      user.bio = bioInput;
      localStorage.setItem("user", JSON.stringify(user));
      alert("프로필이 업데이트되었습니다.");
    });
  }
  // console.log('주소');
  // console.log(window.location.pathname);
  // console.log(window.location.pathname.includes('hash'));
  // console.log(window.location);
  // console.log(window.location + '#/');
};

// 주소가 /면, history #면, hash
export const goTo = (url) => {
  if (window.location.hash) {
    window.location.hash = url;
  } else {
    window.history.pushState({}, "", url);
  }
  Router();
};
