import { ErrorPage, LoginPage, MainPage, ProfilePage } from "../pages";
import { getUser, removeUser } from "../utils/storage";

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
    const root = document.getElementById("root");
    const user = getUser();

    if (user && path === "/login") {
      this.navigateTo("/");
      return;
    }

    if (!user && path === "/profile") {
      this.navigateTo("/login");
      return;
    }

    if (handler) {
      handler(user);
    } else {
      if (root) root.innerHTML = ErrorPage();
    }
  }
}

export const ClassApp = {
  init: () => {
    const router = new Router();
    router.addRoute("/", (user) => {
      document.getElementById("root").innerHTML = MainPage(user);
    });

    router.addRoute("/login", () => {
      const root = document.getElementById("root");
      new LoginPage(root);
    });

    router.addRoute("/profile", (user) => {
      const root = document.getElementById("root");
      new ProfilePage(root, { user });
    });

    router.handleRoute(window.location.pathname);

    document.addEventListener("click", (e) => {
      const target = e.target.closest("a");

      if (target && target.id === "logout") {
        e.preventDefault();
        removeUser();
        router.navigateTo("/login");
      }

      if (target && target.getAttribute("href")?.startsWith("/")) {
        e.preventDefault();
        const href = target.getAttribute("href");
        router.navigateTo(href);
      }
    });
  },
};
