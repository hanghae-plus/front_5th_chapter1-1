import routes from ".";
import { getLocalItem } from "../utils";

export const render = (path) => {
  const user = getLocalItem("user");
  const isLoggedIn = !!user;

  const route = routes[path] || routes[404];

  if (route.needAuth && !isLoggedIn) {
    push("/login");

    return;
  }

  if (path === "/login" && isLoggedIn) {
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
  history.pushState({}, "", path);

  render(path);
};
