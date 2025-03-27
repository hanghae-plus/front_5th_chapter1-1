import render from "../App.js";

const isProd = location.hostname.includes("github.io");

export const routerConfig = {
  type: "history",
  baseUrl: isProd ? "/front_5th_chapter1-1" : "",
  setRouterType: function (routerType) {
    this.type = routerType;
  },
  getRouterType: function () {
    return this.type;
  },
};

export const customRouterUtils = {
  getCurrentPath: () => {
    if (routerConfig.getRouterType() === "hash") {
      return window.location.hash.slice(1);
    }

    const realPath = isProd
      ? window.location.pathname.replace(routerConfig.baseUrl, "")
      : window.location.pathname;
    return realPath;
  },
  navigationTo: (path) => {
    if (routerConfig.getRouterType() === "hash") {
      window.location.hash = path;
    } else {
      const fullPath = routerConfig.baseUrl + path;
      window.history.pushState({}, "", fullPath);
    }

    render();
  },
  // RouterGuard: ({ path, component, redirectComponent }) => {
  //   if (customRouterUtils.getCurrentPath(path) === "/login") {
  //     if (userUtils.isLoggedIn()) {
  //       customRouterUtils.navigationTo("/");
  //       return redirectComponent;
  //     }

  //     return component;
  //   }

  //   if (customRouterUtils.getCurrentPath(path) === "/profile") {
  //     if (!userUtils.isLoggedIn()) {
  //       customRouterUtils.navigationTo("/login");
  //       return redirectComponent;
  //     }

  //     return component;
  //   }
  // },
};
