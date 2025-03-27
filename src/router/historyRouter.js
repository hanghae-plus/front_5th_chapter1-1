import { Router } from ".";
import { addBasePath, removeBasePath } from "../utils/routePath";
import { checkRedirect } from "./routeGuard";
import { ROUTE, ROUTES } from "./routes";

export class HistoryRouter extends Router {
  constructor() {
    super();
    window.addEventListener("popstate", () => super.render());
  }

  getMatched() {
    const path = removeBasePath(location.pathname);
    const current = ROUTES.find((route) => route.path === path);

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
    const to = addBasePath(path);
    useReplace
      ? history.replaceState({}, "", to)
      : history.pushState({}, "", to);
    window.dispatchEvent(new Event("popstate"));
  }
}
