import { ROUTES } from "./routes";
import { $ } from "../utils/dom";

export class BaseRouter {
  constructor({ guardRoute, getCurrentPath, navigate, eventType }) {
    this.root = $("#root");
    this.routes = ROUTES;
    this.guardRoute = guardRoute;
    this.getCurrentPath = getCurrentPath;
    this.navigate = navigate;
    this.eventType = eventType;

    this.init();
  }

  render(component) {
    this.root.innerHTML = component();
  }

  getRoute(routePath = this.getCurrentPath()) {
    return (
      this.routes.find((route) => route.path === routePath) ||
      this.getRoute("*")
    );
  }

  handleRouting(routePath = this.getCurrentPath()) {
    const route = this.getRoute(routePath);

    if (!this.guardRoute) {
      this.render(route.component);
      return;
    }

    this.guardRoute(route, (redirectPath) => {
      if (redirectPath && redirectPath !== routePath) {
        // Redirect
        this.navigate(redirectPath, true);
      } else {
        this.render(route.component);
      }
    });
  }

  push(routePath) {
    this.navigate(routePath, false);
  }

  replace(routePath) {
    this.navigate(routePath, true);
  }

  init() {
    window.addEventListener(this.eventType, () => this.handleRouting());
    this.handleRouting();
  }
}

export class BrowserRouter extends BaseRouter {
  constructor({ guardRoute }) {
    super({
      guardRoute,
      getCurrentPath: () => location.pathname,
      navigate: (path, replace) => {
        window.history[replace ? "replaceState" : "pushState"](null, "", path);
        window.dispatchEvent(new PopStateEvent("popstate"));
      },
      eventType: "popstate",
    });
  }
}

export class HashRouter extends BaseRouter {
  constructor({ guardRoute }) {
    super({
      guardRoute,
      getCurrentPath: () => location.hash.replace(/^#\/?/, "/") || "/",
      navigate: (path) => {
        location.hash = `#${path.replace(/^\/?/, "")}`;
      },
      eventType: "hashchange",
    });
  }
}
