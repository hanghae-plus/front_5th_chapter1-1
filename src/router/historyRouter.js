import Router from "./router.js";
import { addBaseUrl, removeBaseUrl } from "../utils/url.js";

class HistoryRouter extends Router {
  init() {
    window.addEventListener("popstate", () => {
      this.navigate({ to: removeBaseUrl(window.location.pathname) });
    });

    this.navigate({ to: removeBaseUrl(window.location.pathname) });
  }

  push(path) {
    window.history.pushState({}, "", addBaseUrl(path));
  }

  replace(path) {
    window.history.replaceState({}, "", addBaseUrl(path));
  }
}

export default HistoryRouter;
