import { getUser, removeUser } from "../utils/storage";
import { LoginPage, MainPage, ErrorPage, ProfilePage } from "../pages";

export const Router = () => {
  const path = window.location.pathname;
  const root = document.getElementById("root");
  const user = getUser();

  if (user && path === "/login") {
    history.pushState({}, "", "/");
    Router();
    return;
  }

  if (path === "/") {
    document.getElementById("root").innerHTML = MainPage(user);
  } else if (path === "/profile") {
    if (user) {
      new ProfilePage(root, { user });
    } else {
      alert("로그인이 필요합니다");
    }
  } else if (path === "/login") {
    new LoginPage(root);
  } else {
    document.getElementById("root").innerHTML = ErrorPage();
  }
};

const goToLogin = () => {
  removeUser();
  history.pushState({}, "", "/");
  Router();
};

const initRouterEvent = () => {
  document.addEventListener("click", (e) => {
    const target = e.target.closest("a");
    if (target && target.id === "logout") {
      e.preventDefault();
      goToLogin();
    }

    if (
      target &&
      target.getAttribute("href") &&
      target.getAttribute("href").startsWith("/")
    ) {
      e.preventDefault();
      const href = target.getAttribute("href");
      history.pushState({}, "", href);
      Router();
    }
  });
};

export const HistoryApp = {
  init: () => {
    Router();
    window.addEventListener("popstate", () => {
      Router();
    });
    initRouterEvent();
  },
};
