import { ROUTES, BASE_PATH } from "./routes.js";

export const render = () => {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const path = location.pathname.replace(BASE_PATH, "") || "/";

  const PageComponent = ROUTES[BASE_PATH + path];

  if (!PageComponent) {
    if (path !== "/404") {
      history.pushState({}, "", BASE_PATH + "/404");
      render();
    }
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
