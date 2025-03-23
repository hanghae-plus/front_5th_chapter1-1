import { Router } from "./utils/router.js";
import "./utils/event.js";

window.addEventListener("hashchange", () => {
  Router.Render();
});

Router.RouterType = "hash";
Router.Render();
