import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { ProfilePage } from "./components/ProfilePage";
import { NotFoundPage } from "./components/NotFoundPage";

const isLogIn = () => {
  return localStorage.getItem("user") !== null;
};

export const Router = () => {
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
