import { Router } from ".";
import { checkRedirect } from "./routeGuard";
import { ROUTE, ROUTES } from "./routes";

export class HistoryRouter extends Router {
  constructor() {
    super();
  }

  getMatched() {
    const current = ROUTES.find((route) => route.path === location.pathname);

    if (!current) {
      this.navigate(ROUTE.PAGE_NOT_FOUND.path, true);
      return null;
    }

    const redirect = checkRedirect(current);
    if (redirect) {
      this.navigate(redirect.path, true);
      return null;
    }

    return current.component();
  }

  navigate(path, useReplace = false) {
    useReplace
      ? history.replaceState({}, "", path)
      : history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  }
}
