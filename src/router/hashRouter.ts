import { useUserStore } from "@/store";
import ROUTES from "@/data/routes";

export default class HashRouter {
  ROUTES: any;
  pageId: string;

  constructor() {
    this.ROUTES = ROUTES;
    this.pageId = "home";
  }

  init() {
    const userStore = useUserStore();
    const currentHash = location.hash;
    let newHash = currentHash;

    if (currentHash === "#/profile" && !userStore.user) {
      this.pageId = "login";
      newHash = "#/login";
    } else if (
      (currentHash === "#/login" && userStore.user) ||
      currentHash === "#/" ||
      currentHash === ""
    ) {
      this.pageId = "home";
      newHash = "#/";
    } else {
      this.pageId = currentHash.slice(2);
    }
    location.hash = newHash;
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

  navigate(hash: string) {
    let newHash = hash.includes("#") ? hash : `#${hash}`;
    if (hash !== location.hash) {
      location.hash = newHash;
      this.render();
    }
  }
}
