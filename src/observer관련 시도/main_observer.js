import { App } from "./App";
import eventListeners from "./events/eventListeners";
import Router from "./routes/router";
import userStore from "./store/userStore";
import "./routes/index";

const render = () => {
  const root = document.getElementById("root");
  root.innerHTML = App();
};

document.addEventListener("DOMContentLoaded", () => {
  render();
  eventListeners();
});

window.addEventListener("popstate", render);

Router.subscribe(render);
userStore.subscribe(render);
