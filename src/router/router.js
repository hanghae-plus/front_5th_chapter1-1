import { cleanDuplicateSlashes } from "../utils/string.js";

const WILD_PATH = "*";

function createBaseRouter({
  mount,
  routes,
  beforeEnter,
  getRoutePath,
  navigate,
  eventType,
}) {
  const root =
    mount instanceof HTMLElement
      ? mount
      : document.body.querySelector(mount || "#root");

  function getRoute(routePath = getRoutePath()) {
    return (
      routes.find((route) => route.path === routePath) || getRoute(WILD_PATH)
    );
  }

  function renderComponent(component) {
    root.innerHTML = component();
  }

  function render(routePath = getRoutePath()) {
    const route = getRoute(routePath);

    if (!beforeEnter) {
      renderComponent(route.component);
      return;
    }

    beforeEnter(route, (newPath) => {
      if (newPath && newPath !== routePath) {
        navigate(newPath, true);
      } else {
        renderComponent(route.component);
      }
    });
  }

  function push(routePath) {
    navigate(routePath, false);
  }

  function replace(routePath) {
    navigate(routePath, true);
  }

  function init(type) {
    window.addEventListener(type, () => render());
    render();
  }

  init(eventType);

  return { push, replace };
}

export function createHistoryRouter({ baseUrl, mount, routes, beforeEnter }) {
  return createBaseRouter({
    mount,
    routes: routes.map((route) =>
      route.path === WILD_PATH
        ? route
        : {
            ...route,
            path: cleanDuplicateSlashes(`${baseUrl}${route.path}`),
          },
    ),
    beforeEnter,
    getRoutePath: () => location.pathname,
    navigate: (routePath, replace) => {
      const fullPath = cleanDuplicateSlashes(`${baseUrl}${routePath}`);
      history[replace ? "replaceState" : "pushState"](null, "", fullPath);
      window.dispatchEvent(new PopStateEvent("popstate"));
    },
    eventType: "popstate",
  });
}

export function createHashRouter({ mount, routes, beforeEnter }) {
  return createBaseRouter({
    mount,
    routes,
    beforeEnter,
    getRoutePath: () => location.hash.replace(/^#\/?/, "/") || "/",
    navigate: (routePath) => {
      location.hash = `#${routePath}`;
    },
    eventType: "hashchange",
  });
}
