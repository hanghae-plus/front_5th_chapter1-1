import render from "./render";

const goTo = (path) => {
  window.history.pushState({}, "", path);
  render();
};
const replaceTo = (path) => {
  window.history.replaceState({}, "", path);
  render();
};

export { goTo, replaceTo };
