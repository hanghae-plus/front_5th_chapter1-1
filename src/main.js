import render from "./_actions/render";

render();

window.addEventListener("popstate", () => {
  render();
});
