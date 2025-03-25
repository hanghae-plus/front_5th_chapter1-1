import routes from ".";
import Store from "../store";

const isHashRouter = location.hash !== "";

export const render = (path) => {
  const { user } = Store.getState();

  const currentPath = isHashRouter ? location.hash.slice(1) || "/" : path;

  const route = routes[currentPath] || routes[404];

  if (route.needAuth && !user) {
    push("/login");

    return;
  }

  if (currentPath === "/login" && !!user) {
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
  if (isHashRouter) {
    window.location.hash = path;
  } else {
    history.pushState({}, "", path);
  }

  render(path);
};
