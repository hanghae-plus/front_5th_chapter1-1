let routeType = "history";

export default ({ routes, type = "history" }) => {
  routeType = type;
  let notFound = routes.find((route) => route.fragment === "*").component;

  const router = {};

  const checkRoutes = () => {
    const currentRoute = routes.find((route) => {
      if (type === "history") {
        return route.fragment === window.location.pathname;
      } else {
        return route.fragment === window.location.hash;
      }
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    currentRoute.component();
  };

  router.navigate = (fragment) => {
    if (type === "history") {
      history.pushState({}, "", fragment);
      checkRoutes();
    } else {
      window.location.hash = "#" + fragment;
    }
  };

  router.start = () => {
    console.log(routeType);
    if (type === "history") {
      window.addEventListener("popstate", checkRoutes);
    } else {
      window.addEventListener("hashchange", checkRoutes);

      if (!window.location.hash) {
        window.location.hash = "#/";
      }
    }
  };

  return router;
};

export const navigateTo = ({ path, replace }) => {
  if (routeType === "history") {
    if (replace) {
      history.replaceState({}, "", path);
    } else {
      history.pushState({}, "", path);
    }
  } else {
    location.hash = path;
  }
};
