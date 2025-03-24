import { router } from "../shared/libs";
import { delegateNavigationEvents, ensureRootElement } from "../shared/utils";
import { setupRoutes } from "./route";

export const render = () => {
  setupRoutes();
  ensureRootElement();
  delegateNavigationEvents(router);

  if (window.location.pathname.includes("hash.html")) {
    const path = window.location.hash.substring(1) || "/";
    router.handleRoute(path);
  } else {
    let path = window.location.pathname;

    if (window.location.hostname.includes("github.io")) {
      if (
        path === "/front_5th_chapter1-1/" ||
        path === "/front_5th_chapter1-1"
      ) {
        path = "/";
      }
    }

    router.handleRoute(path);
  }
};
