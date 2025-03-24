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
    const path = window.location.pathname;
    router.handleRoute(path);
  }
};
