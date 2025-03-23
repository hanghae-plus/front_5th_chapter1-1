import { hydrateLinkIntoRouter } from "./hydrate";
import { routes } from "./routes";

export const render = (pathname) => {
  if (pathname) {
    history.pushState({}, "", pathname);
  }
  const page =
    routes[pathname || window.location.pathname] || routes["default"];

  document.body.innerHTML = page.render();
  page.onRender?.();
  hydrateLinkIntoRouter();
};

export const startRouter = () => {
  render();
  window.addEventListener("popstate", () => render());
};
