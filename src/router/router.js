import { ROUTES } from "./routes.js";
import { NotFoundPage } from "../pages/NotFoundPage.js";

export const render = () => {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const path = location.pathname;
  const PageComponent = ROUTES[path];
  if (!PageComponent) {
    if (path !== "/404") {
      history.pushState({}, "", "/404");
      render();
      return;
    }
    const page = NotFoundPage();
    root.appendChild(page);
    return;
  }

  const page = PageComponent();
  if (page) {
    root.appendChild(page);
  }
};

export const navigate = (path) => {
  history.pushState({}, "", path);
  render();
};
