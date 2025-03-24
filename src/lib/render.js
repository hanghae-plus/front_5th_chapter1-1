import { App } from "../App";
import { route } from "./route";

const root = document.getElementById("root");

export const render = () => {
  root.innerHTML = App();
  route();
};
