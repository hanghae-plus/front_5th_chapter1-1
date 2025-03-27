import { ROUTE_TYPES, ROUTE_PATHS, routes } from "../constants";
import { authStore } from "../store/authStore";
import { cleanupAll } from "./cleanup";

const BASE_PATH = import.meta.env.BASE_URL;

const createRouter = () => {
  const navigate = (path) => {
    const fullPath = BASE_PATH + (path.startsWith("/") ? path.slice(1) : path);

    if (fullPath === window.location.pathname) return;

    window.history.pushState({}, "", fullPath);

    render();
  };

  const authGuard = (path, route) => {
    if (route.needAuth && !authStore.getState("isLoggedIn")) {
      return {
        redirect: true,
        path: ROUTE_PATHS.LOGIN,
      };
    }

    if (path === ROUTE_PATHS.LOGIN && authStore.getState("isLoggedIn")) {
      return {
        redirect: true,
        path: ROUTE_PATHS.HOME,
      };
    }

    return {
      redirect: false,
    };
  };

  const render = (isHashChange = false) => {
    const fullPath = isHashChange
      ? window.location.hash.slice(1)
      : window.location.pathname;

    const path = fullPath.replace(BASE_PATH, "/");

    const route = routes[path] ?? routes[ROUTE_PATHS.ERROR];

    const authGuardResult = authGuard(path, route);

    if (authGuardResult.redirect) {
      navigate(authGuardResult.path);
      return;
    }

    const container = route.container();

    if (route.type === ROUTE_TYPES.PAGE) {
      cleanupAll();

      document.getElementById("root").innerHTML = container.render();
      container.onRendered?.();
      return;
    }

    const main = document.querySelector("#root #main");

    if (!main) {
      cleanupAll();

      document.getElementById("root").innerHTML = container.render();
      container.onRendered?.();
      return;
    }

    const content = route.content();

    main.innerHTML = content.render();
    content.onRendered?.();
  };

  const onPopState = () => {
    render();
  };

  const onHashChange = () => {
    render(true);
  };

  const init = () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      authStore.setState({
        isLoggedIn: true,
      });
    }

    cleanupAll();

    window.addEventListener("popstate", onPopState);
    window.addEventListener("hashchange", onHashChange);
    render();
  };

  return {
    navigate,
    init,
  };
};

export default createRouter;
