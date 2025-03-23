import render from "./render";

const goTo = (path) => {
  window.history.pushState({}, "", path);
  render();
};

export default goTo;
