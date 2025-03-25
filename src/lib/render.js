import { route } from "./route";

const root = document.getElementById("root");

export const render = () => {
  root.innerHTML = route();
};
