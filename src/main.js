import { getHtmlByPath } from "./router";

const renderApp = () => {
  const root = document.getElementById("root");

  const urlParams = new URLSearchParams(window.location.search);
  const path = urlParams.get("path");

  if (path) {
    history.replaceState(null, "", path);
  }

  root.innerHTML = getHtmlByPath();
};

renderApp();

window.addEventListener("popstate", renderApp);
window.addEventListener("hashchange", renderApp);
