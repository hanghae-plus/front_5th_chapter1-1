import { App } from "./utils/router.js";
import "./utils/event.js";

window.addEventListener("hashchange", () => {
  App.Render();
});

App.RouterType = "hash";
App.Render();
