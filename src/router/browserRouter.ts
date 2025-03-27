import { useUserStore } from "@/store";
import ROUTES from "@/data/routes";
import { DEPLOYED_PREFIX } from "@/utils/data";
export default class BrowserRouter {
  ROUTES: any;
  pageId: string;
  prefix: string;

  constructor() {
    this.ROUTES = ROUTES;
    this.pageId = "home";
    this.prefix =
      location.pathname.indexOf(DEPLOYED_PREFIX) === 0 ? DEPLOYED_PREFIX : "";
  }

  init() {
    const userStore = useUserStore();
    const splittedPathname = location.pathname.split("/");
    const pathname = splittedPathname[splittedPathname.length - 1];

    if (pathname === "profile" && !userStore.user) {
      history.pushState(null, "", `${this.prefix}/login`);
      this.pageId = "login";
    } else if (pathname === "login" && userStore.user) {
      history.pushState(null, "", `${this.prefix}/`);
      this.pageId = "home";
    } else {
      this.pageId = pathname === "" ? "home" : pathname;
    }
  }

  render() {
    this.init();
    const App = this.ROUTES[this.pageId]
      ? this.ROUTES[this.pageId].page
      : this.ROUTES["error"].page;
    const app = App();
    const root = document.getElementById("root");

    if (root) {
      root.innerHTML = app.template();
    }

    if (app?.setEventHandlers) {
      app.setEventHandlers();
    }

    document.querySelector("nav")?.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target) {
        const target = e.target as HTMLAnchorElement;
        if (target.nodeName === "A") {
          const newPathName = target.href.replace(location.origin, "");
          this.navigate(newPathName);
        }
      }
    });
  }

  navigate(pathname: string) {
    if (pathname !== window.location.pathname) {
      history.pushState(null, "", `${this.prefix}${pathname}`);
      this.render();
    }
  }
}
