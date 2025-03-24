import { route } from "./route.hash";

const root = document.getElementById("root");

export const render = () => {
  root.innerHTML = route();
};
