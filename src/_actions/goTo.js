import states from "../_states";
import hashRender from "./hashRender";
import render from "./render";

const goTo = (path) => {
  if (states.routeType === "history") {
    window.history.pushState({}, "", path);
    render();
  }
  if (states.routeType === "hash") {
    window.location.hash = path;
    hashRender();
  }
};
const replaceTo = (path) => {
  window.history.replaceState({}, "", path);
  render();
};

export { goTo, replaceTo };
