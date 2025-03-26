import { Router } from ".";
import { checkRedirect } from "./routeGuard";
import { ROUTE, ROUTES } from "./routes";

export class HashRouter extends Router {
  constructor() {
    super();
    window.addEventListener("hashchange", () => super.render());
  }

  getMatched() {
    const current = location.hash
      ? ROUTES.find((route) => route.hash === location.hash)
      : ROUTE.HOME;

    if (!current) {
      this.navigate(ROUTE.PAGE_NOT_FOUND.hash, true);
      return null;
    }

    const redirect = checkRedirect(current);
    if (redirect) {
      this.navigate(redirect.hash, true);
      return null;
    }

    return current.component();
  }

  navigate(hash) {
    location.hash = hash;
    window.dispatchEvent(new Event("hashchange"));
  }
}
