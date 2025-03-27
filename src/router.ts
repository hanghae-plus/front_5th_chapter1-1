import { useUserStore } from "@/store";
import ROUTES from "./data/routes";

export default class Router {
  ROUTES: any;
  pathname: string;

  constructor() {
    this.ROUTES = ROUTES;
    this.pathname = "/";
  }

  init() {
    const userStore = useUserStore();
    let pathname = location.pathname;

    if (pathname === "/profile" && !userStore.user) {
      history.pushState(null, "", "/login");
      pathname = "/login";
    } else if (pathname === "/login" && userStore.user) {
      history.pushState(null, "", "/");
      pathname = "/";
    }
  }

  render() {
    this.init();

    const App = this.ROUTES[this.pathname]
      ? this.ROUTES[this.pathname].page
      : this.ROUTES["/error"].page;
    const app = App();
    const root = document.getElementById("root");

    if (root) {
      root.innerHTML = app.template();
    }

    if (app?.setEventHandlers) {
      app.setEventHandlers();
    }

    document.querySelectorAll("a").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target) {
          const target = e.target as HTMLAnchorElement;
          const newPathName = target.href.replace(location.origin, "");
          this.navigate(newPathName);
        }
      });
    });
  }

  navigate(pathname: string) {
    if (pathname !== window.location.pathname) {
      history.pushState(null, "", pathname);
      this.render();
    }
  }
}
