import { mode } from "./mode";
import { render } from "./render";

export const navigate = (pathname) => {
  if (mode() === "hash") {
    history.pushState(null, "", `#/` + pathname.replace(/^\/+/, ""));
    window.dispatchEvent(new Event("hashchange"));
    return;
  }
  history.pushState(null, "", pathname);
  render();
};
