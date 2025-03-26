// router/router.js

import { ROUTES } from "./routes.js";
import { ErrorPage } from "../pages/ErrorPage.js";

export const render = () => {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const path = location.hash.slice(1) || "/";
  const PageComponent = ROUTES[path] || ErrorPage;
  const page = PageComponent();

  if (page) {
    root.appendChild(page);
  }
};

export const navigate = (path) => {
  if (location.hash.slice(1) !== path) {
    location.hash = path;
  } else {
    render();
  }
};
