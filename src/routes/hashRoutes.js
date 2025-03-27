import { BASE_PATH } from "../constants";
import { ErrorPage, LoginPage, MainPage, ProfilePage } from "../pages";
import { handleLogin, updateProfile } from "../services/auth";
import { userStore } from "../store/store";

const routes = {
  [`${BASE_PATH}#/`]: MainPage,
  [`${BASE_PATH}#/profile`]: ProfilePage,
  [`${BASE_PATH}#/login`]: LoginPage,
};

const renderPageWithHash = (path) => {
  window.location.hash = path;
  render();
};

export const render = () => {
  const root = document.getElementById("root");
  const path =
    location.hash === "" ? `${BASE_PATH}#/` : `${BASE_PATH}${location.hash}`;

  const isLoggedIn = userStore.loggedIn();

  if (!isLoggedIn && path === `${BASE_PATH}#/profile`) {
    return renderPageWithHash(`${BASE_PATH}#/login`);
  }
  if (isLoggedIn && path === `${BASE_PATH}#/login`) {
    return renderPageWithHash(`${BASE_PATH}#/`);
  }

  const page = routes[path] || ErrorPage;
  root.innerHTML = page();

  root.addEventListener("click", (e) => {
    const target = e.target.closest("a");
    if (!target) return;

    e.preventDefault();
    if (e.target.id === "logout") {
      userStore.logout();

      history.pushState(null, null, `${BASE_PATH}#/login`);
      return render();
    }

    renderPageWithHash(`${BASE_PATH}#${target.pathname}`);
  });

  root.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.target.id === "login-form") {
      handleLogin(e.target.elements);
      renderPageWithHash(`${BASE_PATH}#/profile`);
    }

    if (e.target.id === "profile-form") {
      updateProfile(e.target.elements);
    }
  });
};

window.addEventListener("hashchange", render);
