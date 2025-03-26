import { handleClick, handleSubmit } from "./event/events";
import { render } from "./core/render";

const root = document.getElementById("root");

render();

window.addEventListener("popstate", () => render());
window.addEventListener("hashchange", () => render());

root.addEventListener("submit", (e) => handleSubmit(e));
root.addEventListener("click", (e) => handleClick(e));
