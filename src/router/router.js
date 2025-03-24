import { ROUTES } from "./routes.js";
import { ErrorPage } from "../pages/ErrorPage.js";

export const render = () => {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const PageComponent = ROUTES[location.pathname] || ErrorPage;
  const page = PageComponent();

  if (page) {
    root.appendChild(page);
  }
};

export const navigate = (path) => {
  history.pushState({}, "", path);
  render();
};
