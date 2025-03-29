import { App } from "./App";

const root = document.getElementById("root");

export const render = () => {
  root.innerHTML = App();
};
