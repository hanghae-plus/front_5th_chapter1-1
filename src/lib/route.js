import { render } from "./render";

const root = document.getElementById("root");

export const route = () => {
  root.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const nextPathName = e.target.href.replace(location.origin, "");
      history.pushState(null, "", nextPathName);
      render();
    });
  });
};
