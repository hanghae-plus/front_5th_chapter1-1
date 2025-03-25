import { router } from "./router";
import actionScripts from "./scripts";

const app = document.querySelector("#root");
router(app);
actionScripts();
