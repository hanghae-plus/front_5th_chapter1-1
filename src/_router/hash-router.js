import BaseRouter from "./base-router.js";
import { ROUTE } from "./constants.js";

class HashRouter extends BaseRouter {
  addRoute = (path, handler, guards = []) => {
    this.routes.push({
      path,
      handler,
      guards,
    });
  };

  init = () => {
    if (!location.hash) {
      location.hash = "#/";
    }
    this.handleRouteChange();
  };

  handleRouteChange = () => {
    const currentHash = location.hash.slice(1) || "/";
    if (this.lastHash === currentHash) return;
    this.lastHash = currentHash;

    const route =
      this.routes.find((r) => r.path === currentHash) ||
      this.routes.find((r) => r.path === ROUTE.error);

    if (!route) return;

    for (const guard of route.guards) {
      if (!guard()) {
        return;
      }
    }

    route.handler();
  };

  navigate = (path) => {
    window.location.hash = path;
  };
}

export default HashRouter;
