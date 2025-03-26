import { render } from "./router/router";

const app = () => {
  window.addEventListener("popstate", render);
  render();
};

app();
