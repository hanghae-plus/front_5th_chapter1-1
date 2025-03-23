import { Router } from "./Router";

const render = () => {
  document.getElementById("root").innerHTML = Router();
};
render();

export const changeUrl = (url) => {
  history.pushState(null, null, url);
  render(url);
};

window.addEventListener("popstate", render);

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("move-to-home")) {
    e.preventDefault();
    changeUrl("/");
  } else if (e.target.classList.contains("move-to-profile")) {
    e.preventDefault();
    changeUrl("/profile");
  }
});
