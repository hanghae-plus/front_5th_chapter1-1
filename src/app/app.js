import { config } from "../shared/config";
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
      const basePath = config.basePath.endsWith("/")
        ? config.basePath.slice(0, -1)
        : config.basePath;
      if (path === basePath + "/" || path === basePath) {
        path = "/";
      } else if (path.startsWith(basePath)) {
        path = path.replace(basePath, "");
      }
    }

    router.handleRoute(path);
  }
};
