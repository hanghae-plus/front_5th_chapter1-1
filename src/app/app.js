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
    const basePath = window.location.hostname.includes("github.io")
      ? "/front_5th_chapter1-1"
      : "";

    if (basePath && path.startsWith(basePath)) {
      path = path.replace(basePath, "") || "/";
    }

    if (path === "") path = "/";

    router.handleRoute(path);
  }
};
