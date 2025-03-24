import { handleClick, handleSubit } from "./lib/events";
import { render } from "./lib/render";
import User from "./store/user";

const root = document.getElementById("root");

const user = new User();

render();

window.addEventListener("popstate", () => {
  render();
});

root.addEventListener("submit", (e) => handleSubit(e, user));
root.addEventListener("click", (e) => handleClick(e, user));
