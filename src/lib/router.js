export const historyRouter = (routes) => {
  let notFound = routes.find((route) => route.fragment === "*").component;

  const router = {};

  const checkRoutes = () => {
    const currentRoute = routes.find((route) => {
      return route.fragment === window.location.pathname;
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    currentRoute.component();
  };

  router.navigate = (fragment) => {
    history.pushState({}, "", fragment);
    checkRoutes();
  };

  router.start = () => {
    window.addEventListener("popstate", checkRoutes);
  };

  return router;
};

export const hashRouter = (routes) => {
  let notFound = routes.find((route) => route.fragment === "*").component;

  const router = {};

  const checkRoutes = () => {
    const currentRoute = routes.find((route) => {
      return route.fragment === window.location.hash;
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    currentRoute.component();
  };

  router.navigate = (fragment) => {
    window.location.hash = "#" + fragment;
    checkRoutes();
  };

  router.start = () => {
    window.addEventListener("hashchange", checkRoutes);

    if (!window.location.hash) {
      window.location.hash = "#/";
    }
  };

  return router;
};

export const navigateTo = ({ path, replace = false }) => {
  if (replace) {
    history.replaceState({}, "", path);
  } else {
    history.pushState({}, "", path);
  }
};

export const hashNavigateTo = (path) => {
  location.hash = path;
};
