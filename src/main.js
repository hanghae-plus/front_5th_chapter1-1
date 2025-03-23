import { Router } from "./Router";

const render = () => {
  document.getElementById("root").innerHTML = Router();
};
render();

export const changeUrl = (url) => {
  history.pushState(null, null, url);
  render(url);
};

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("move-to-home")) {
    changeUrl("/");
  } else if (e.target.classList.contains("move-to-profile")) {
    changeUrl("/profile");
  }
});
