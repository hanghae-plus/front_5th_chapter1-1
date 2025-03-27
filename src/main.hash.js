import { Router } from "./utils/router.js";
import "./utils/event.js";

window.addEventListener("hashchange", () => {
  Router.render();
});

Router.RouterType = "hash";
Router.render();
