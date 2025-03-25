import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { ProfilePage } from "./components/ProfilePage";
import { NotFoundPage } from "./components/NotFoundPage";

export const Router = () => {
  const path = window.location.pathname;

  const rederPage = () => {
    let whatPage = "";
    let layout = "";

    switch (path) {
      case "/":
        whatPage = HomePage();
        layout = `${Header()}${whatPage}${Footer()}`;
        break;
      case "/login":
        whatPage = LoginPage();
        layout = `${whatPage}`;
        break;
      case "/profile":
        whatPage = ProfilePage();
        layout = `${Header()}${whatPage}${Footer()}`;
        break;
      default:
        whatPage = NotFoundPage();
        layout = `${whatPage}`;
        break;
    }

    document.body.innerHTML = layout;
  };

  rederPage();
};
