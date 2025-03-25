import { route } from "./route";

const root = document.getElementById("root");

export const render = () => {
  root.innerHTML = "";
  root.innerHTML = route();
};
