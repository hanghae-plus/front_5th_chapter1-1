import Router from "./router.js";

class HashRouter extends Router {
  init() {
    window.addEventListener("hashchange", () => {
      this.navigate({ to: window.location.hash.slice(1) ?? "/" });
    });

    const path = window.location.hash.slice(1) ?? "/";
    this.navigate({ to: path });
  }

  push(path) {
    const url = window.location.href.replace(/(#.*)?$/, `#${path}`);
    window.location.replace(url);
  }

  replace(path) {
    window.location.hash = `#${path}`;
  }
}

export default HashRouter;
