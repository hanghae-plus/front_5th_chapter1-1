import ErrorPage from "../pages/Error";

import { login, logout, updateUser } from "../store/auth";

class Router {
  static instance = null;

  static getInstance(routes, options) {
    if (!Router.instance) {
      Router.instance = new Router(routes, options);
    }
    return Router.instance;
  }

  constructor(routes, options = { mode: "history" }) {
    if (Router.instance) {
      return Router.instance;
    }

    this.routes = routes;
    this.mode = options.mode;

    this.currentPath =
      this.mode === "hash"
        ? window.location.hash.slice(1) || "/"
        : window.location.pathname;

    if (this.mode === "hash") {
      window.addEventListener("hashchange", () => {
        this.currentPath = window.location.hash.slice(1) || "/";
        this.render();
      });
    } else {
      window.addEventListener("popstate", () => {
        this.currentPath = window.location.pathname;
        this.render();
      });
    }

    Router.instance = this;

    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        this.navigate(e.target.getAttribute("href"));
      }
    });

    document.addEventListener("submit", (e) => {
      if (e.target.id === "login-form") {
        e.preventDefault();
        const username = document.getElementById("username").value;
        login({ username, email: "", bio: "" });
        this.navigate("/profile");
      }

      if (e.target.id === "profile-form") {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const bio = document.getElementById("bio").value;
        updateUser({ username, email, bio });
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.matches('[data-action="logout"]')) {
        e.preventDefault();
        logout();
        this.navigate("/login");
      }
    });
  }

  getLinkHref(path) {
    return this.mode === "hash" ? `#${path}` : path;
  }

  navigate(to) {
    if (this.mode === "hash") {
      window.location.hash = to;
    } else {
      window.history.pushState({}, "", to);
    }
    this.currentPath = to;
    this.render();
  }

  render() {
    const page = this.routes[this.currentPath]
      ? this.routes[this.currentPath]()
      : ErrorPage();
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = page;
    }
  }
}

export default Router;
