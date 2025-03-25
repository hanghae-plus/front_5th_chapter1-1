import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { ProfilePage } from "./components/ProfilePage";
import { NotFoundPage } from "./components/NotFoundPage";

export const Router = () => {
  const path = window.location.pathname;
  const isLogIn =
    localStorage.getItem("username") && localStorage.getItem("password");

  let layout = "";

  switch (path) {
    case "/":
      layout = `${Header()}${HomePage()}${Footer()}`;
      break;
    case "/login":
      layout = `${LoginPage()}`;
      break;
    case "/profile":
      if (isLogIn) {
        layout = `${Header()}${ProfilePage()}${Footer()}`;
      } else {
        goTo("/login");
        return;
      }
      break;
    default:
      layout = `${NotFoundPage()}`;
      break;
  }

  document.body.innerHTML = layout;
};

const goTo = (url) => {
  window.history.pushState({}, "", url);
  Router();
};

// window.addEventListener('popstate', () => {
//   renderPage();
// });
