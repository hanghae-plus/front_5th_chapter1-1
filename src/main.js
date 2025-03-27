import { userContext } from "./context/userContext.js";
import { renderApp } from "./app.js";
import { handleLinkClick, handlePopState } from "./router/Router.js";

userContext.setState({ isLoggedIn: false, user: null, path: "/" });

renderApp();

function initializeEventListeners() {
  window.addEventListener("load", () => {
    const initialPath = window.location.pathname;
    userContext.setState({ path: initialPath });
  });

  window.addEventListener("popstate", handlePopState);
  document.addEventListener("click", handleLinkClick);
}

initializeEventListeners();
