import { loadContent } from "../controller/injectRoutes";
import { ErrorPage } from "../pages/Error";

class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      loadContent(ErrorPage());
    }
  }
  checkRoute(path) {
    return Object.keys(this.routes).includes(path);
  }
}

export const router = new Router();
