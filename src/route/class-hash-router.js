import { getUser, removeUser } from "../utils/storage";
import { MainPage, LoginPage, ProfilePage, ErrorPage } from "../pages";

class HashRouter {
  constructor() {
    this.routes = new Map();
    this.defaultHandler = () => {
      const root = document.getElementById("root");
      new ErrorPage(root);
    };

    window.addEventListener("hashchange", this.handleRouteChange.bind(this));
    window.addEventListener("load", this.handleRouteChange.bind(this));
  }

  addRoute(fragment, component) {
    this.routes.set(fragment, component);
    return this;
  }

  setDefault(handler) {
    this.defaultHandler = handler;
    return this;
  }

  navigateTo(path) {
    if (!path.startsWith("/")) {
      path = "/" + path;
    }
    window.location.hash = `#${path}`;
  }

  handleRouteChange() {
    const hash = window.location.hash || "#/";
    const user = getUser();
    const handler = this.routes.get(hash);
    const root = document.getElementById("root");

    if (!root) return;
    // 권한 관련 리다이렉트 처리
    if (user && hash === "#/login") {
      this.navigateTo("/");
      return;
    }

    if (!user && hash === "#/profile") {
      this.navigateTo("/login");
      return;
    }

    if (handler) {
      handler(user);
    } else {
      this.defaultHandler();
    }
  }
}

export const HashClassApp = {
  init: () => {
    const router = new HashRouter();

    router
      .addRoute("#/", (user) => {
        const root = document.getElementById("root");
        new MainPage(root, { user });
      })
      .addRoute("#/login", () => {
        const root = document.getElementById("root");
        new LoginPage(root);
      })
      .addRoute("#/profile", (user) => {
        const root = document.getElementById("root");
        new ProfilePage(root, { user });
      })
      .setDefault(() => {
        const root = document.getElementById("root");
        new ErrorPage(root);
      });

    document.addEventListener("click", (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      // 로그아웃 클릭 시
      if (target.id === "logout") {
        e.preventDefault();
        removeUser();
        router.navigateTo("login");
        return;
      }

      // 해시 라우터 내부 링크 클릭 시
      const href = target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        router.navigateTo(href.replace(/^#\/?/, ""));
      }
    });
  },
};
