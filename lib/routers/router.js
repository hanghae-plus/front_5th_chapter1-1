import { PATH } from "@lib/configs/path";

function baseRouter({ navigate, run, currentPath, redirectTo }) {
  return {
    navigate,
    run,
    currentPath,
    redirectTo,
  };
}

function hashRouter(render) {
  return baseRouter({
    currentPath: window.location.hash.slice(1) || PATH.landing,
    run: () => window.addEventListener("hashchange", render),
    navigate: (newPath) => (window.location.hash = newPath),
    redirectTo: (redirectTo) => (window.location.hash = redirectTo),
  });
}

function browserRouter(render) {
  return baseRouter({
    currentPath: window.location.pathname,
    run: () => window.addEventListener("popstate", render),
    navigate: (newPath) => window.history.pushState({}, "", newPath),
    redirectTo: (redirectTo) => window.history.pushState({}, "", redirectTo),
  });
}

const router = (type) => {
  switch (type) {
    case "hash":
      return hashRouter;
    case "browser":
      return browserRouter;
    default:
      throw new Error("Invalid router type");
  }
};

export { router };
