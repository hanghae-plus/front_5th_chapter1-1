import { ROUTES, BASE_PATH } from "./routes.js";

export const render = () => {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const path = location.hash.slice(1) || "/";

  const PageComponent = ROUTES[BASE_PATH + path];

  if (!PageComponent) {
    if (path !== "/404") {
      location.hash = "#/404";
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
  if (location.hash.slice(1) !== `${BASE_PATH}${path}`) {
    location.hash = `${BASE_PATH}${path}`;
  } else {
    render();
  }
};
