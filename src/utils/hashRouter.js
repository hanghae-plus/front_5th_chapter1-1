import auth from "../store/auth.js";
import { restoreAuth } from "./auth.js";

class HashRouter {
  containerElement = null;
  routeMapping = {};
  activeRoutePath = null;
  protectedRoutes = ["/profile"];
  guestOnlyRoutes = ["/login"];

  constructor(routes) {
    this.routeMapping = routes;
    this.containerElement = document.getElementById("root") || document.body;

    restoreAuth();

    this._initializeEventListeners();
    this.processRouteChange();
  }

  _initializeEventListeners() {
    window.addEventListener("DOMContentLoaded", () =>
      this.processRouteChange(),
    );
    window.addEventListener("hashchange", () => this.processRouteChange());
    document.addEventListener("click", (event) =>
      this._handleNavLinkClick(event),
    );
  }

  _handleNavLinkClick(event) {
    if (
      event.target.tagName === "A" &&
      event.target.href.startsWith(window.location.origin)
    ) {
      event.preventDefault();
      this.changeRoute(event.target.getAttribute("href"));
    }
  }

  hasAccessPermission(requestedPath) {
    const userIsAuthenticated = auth.getIsLoggedIn();

    if (this.protectedRoutes.includes(requestedPath)) {
      return userIsAuthenticated;
    }

    if (this.guestOnlyRoutes.includes(requestedPath) && userIsAuthenticated) {
      return false;
    }

    return true;
  }

  _redirectBasedOnAuthStatus() {
    const userIsAuthenticated = auth.getIsLoggedIn();

    if (userIsAuthenticated) {
      this.changeRoute("/");
    } else {
      this.changeRoute("/login");
    }
  }

  _renderPageContent(pageComponent) {
    const renderedContent = pageComponent();

    this.containerElement.innerHTML = "";

    if (typeof renderedContent === "string") {
      this.containerElement.innerHTML = renderedContent;
      return;
    }

    if (renderedContent.template) {
      this.containerElement.innerHTML = renderedContent.template;

      if (typeof renderedContent.init === "function") {
        renderedContent.init();
      }
    } else {
      console.error("Invalid component format");
    }
  }

  _getPath() {
    const hash = window.location.hash;
    return hash ? hash.substring(1) : "/";
  }

  processRouteChange() {
    const requestedPath = this._getPath();
    this.activeRoutePath = requestedPath;

    if (!this.hasAccessPermission(requestedPath)) {
      this._redirectBasedOnAuthStatus();
      return;
    }

    if (!this.routeMapping[requestedPath]) {
      this._renderPageContent(this.routeMapping["/error"]);
      return;
    }

    const pageComponent = this.routeMapping[requestedPath];
    this._renderPageContent(pageComponent);
  }

  changeRoute(targetPath) {
    if (this.activeRoutePath === targetPath) return;

    window.location.hash = targetPath;
    this.processRouteChange();
  }
}

export default HashRouter;
