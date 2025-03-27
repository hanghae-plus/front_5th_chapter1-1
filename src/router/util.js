import routes from ".";
import Store from "../store";

const isHashRouter = () => location.hash.includes("#");
const BASE_PATH = "/front_5th_chapter1-1";

const getCurrentPath = () => {
  if (isHashRouter()) return location.hash.slice(1) || "/";

  const pathname = location.pathname;

  if (!pathname.startsWith(BASE_PATH)) {
    return pathname;
  }

  return pathname.replace(BASE_PATH, "") || "/";
};

export const render = () => {
  const path = getCurrentPath();

  const { user } = Store.getState();

  const currentPath = isHashRouter() ? location.hash.slice(1) || "/" : path;

  const normalizedPath = !currentPath.startsWith("/")
    ? "/" + currentPath
    : currentPath;

  const route = routes[normalizedPath] || routes[404];

  if (route.needAuth && !user) {
    push("/login");

    return;
  }

  if (normalizedPath === "/login" && !!user) {
    push("/");

    return;
  }

  const root = document.getElementById("root");
  const wrapper = document.createElement("div");

  wrapper.innerHTML = route.component();

  root.innerHTML = "";
  root.appendChild(wrapper);
};

export const push = (path) => {
  if (isHashRouter()) {
    location.hash = path;
  } else {
    history.pushState({}, "", BASE_PATH + path);
  }

  render();
};
