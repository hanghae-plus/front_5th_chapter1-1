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
        layout = `${Header()}${Footer()}`;
        break;
      case "/login":
        whatPage = LoginPage();
        break;
      case "/profile":
        whatPage = ProfilePage();
        layout = `${Header()}${Footer()}`;
        break;
      default:
        whatPage = NotFoundPage();
    }

    document.body.innerHTML = `
      $${layout || ""}${whatPage}
    `;
  };

  rederPage();
};
