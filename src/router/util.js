import routes from ".";
import Store from "../store";

export const render = (path) => {
  const { user } = Store.getState();

  const route = routes[path] || routes[404];

  if (route.needAuth && !user) {
    push("/login");

    return;
  }

  if (path === "/login" && !!user) {
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
