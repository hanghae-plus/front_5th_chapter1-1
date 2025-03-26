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
  const path = window.location.pathname;

  let layout = "";

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

  document.getElementById("root").innerHTML = layout;
};

export const goTo = (url) => {
  window.history.pushState({}, "", url);
  Router();
};
