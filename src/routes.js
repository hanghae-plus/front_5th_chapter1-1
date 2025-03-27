import MainLayout from "./components/MainLayout";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import ErrorPage from "./components/ErrorPage";
import { state } from "./state";

const BASE_PATH = "/front-5th-chapter1-1";

export const getPageContent = (fullPath) => {
  const path = fullPath.split("/front-5th-chapter1-1")[1];

  if (!path) return ErrorPage();

  switch (path) {
    case "/":
      return MainLayout(HomePage);
    case "/profile": {
      if (!state.user) {
        navigate("/login");
        return LoginPage();
      }
      return MainLayout(ProfilePage);
    }
    case "/login": {
      if (state.user) {
        navigate("/");
        return MainLayout(HomePage);
      }
      return LoginPage();
    }
    default:
      return ErrorPage();
  }
};

export const navigate = (path) => {
  const fullPath = BASE_PATH + path;
  window.history.pushState(null, "", fullPath);
  render(fullPath);
};

export const render = (fullPath) => {
  if (!fullPath.startsWith(BASE_PATH)) {
    fullPath = BASE_PATH + fullPath;
  }
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = getPageContent(fullPath);
};
