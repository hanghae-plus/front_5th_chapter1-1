import { mode } from "./mode";

export const navigate = (pathname) => {
  if (mode() === "hash") {
    history.pushState(null, "", `#/` + pathname.replace(/^\/+/, ""));
    window.dispatchEvent(new Event("hashchange"));
    return;
  }
  history.pushState(null, "", pathname);
  window.dispatchEvent(new Event("popstate"));
  return;
};
