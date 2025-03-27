import { config } from "../shared/config";
import { router } from "../shared/libs";
import { delegateNavigationEvents } from "../shared/utils";
import { routes } from "./route";

export const render = () => {
  // * 각 Routes 초기화
  routes().start();
  delegateNavigationEvents(router);

  // * Hash Router 처리 로직
  if (window.location.pathname.includes("hash.html")) {
    const path = window.location.hash.substring(1) || "/";
    router.handleRoute(path);
  } else {
    // * GitHub Pages & Basic Router 처리 로직
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
    console.log(router.routes);
    router.handleRoute(path);
  }
};
