import { BASE_PATH } from "../constants";
import { ErrorPage, LoginPage, MainPage, ProfilePage } from "../pages";
import { handleLogin, updateProfile } from "../services/auth";
import { userStore } from "../store/store";

const routes = {
  [`${BASE_PATH}/`]: MainPage,
  [`${BASE_PATH}/profile`]: ProfilePage,
  [`${BASE_PATH}/login`]: LoginPage,
};

const renderPageWithHistory = (path) => {
  history.pushState(null, null, path);
  render();
};

export const render = () => {
  const root = document.getElementById("root");
  const path = location.pathname;
  const isLoggedIn = userStore.loggedIn();

  // 가드 만들기
  if (!isLoggedIn && path === `${BASE_PATH}/profile`) {
    return renderPageWithHistory(`${BASE_PATH}/login`);
  }
  if (isLoggedIn && path === `${BASE_PATH}/login`) {
    return renderPageWithHistory(`${BASE_PATH}/`);
  }

  const page = routes[path] || ErrorPage;
  root.innerHTML = page();

  root.addEventListener(
    "click",
    (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      e.preventDefault();

      if (e.target.id === "logout") {
        userStore.logout();
        renderPageWithHistory(`${BASE_PATH}/login`);
      }

      renderPageWithHistory(`${BASE_PATH + target.pathname}`);
    },
    {
      once: true,
    },
  );

  root.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();

      if (e.target.id === "login-form") {
        handleLogin(e.target.elements);
        renderPageWithHistory(`${BASE_PATH}/profile`);
      }

      if (e.target.id === "profile-form") {
        updateProfile(e.target.elements);
      }
    },
    {
      once: true,
    },
  );
};

window.addEventListener("popstate", render);
