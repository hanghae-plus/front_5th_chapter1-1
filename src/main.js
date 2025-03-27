import { Router } from "./public/router";

const App = {
  init: () => {
    Router.render();
    window.addEventListener("popstate", () => {
      Router.render();
    });
  },
};

App.init();
