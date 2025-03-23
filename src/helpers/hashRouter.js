export function createHashRouter(root, routes) {
  let guard = null;
  const content = document.createElement("div");
  root.appendChild(content);

  const getRoute = (path) => {
    const currentPath = path.replace("#", "") || "/";
    const route = routes[currentPath] ?? routes["*"];
    return route.redirect ? getRoute(route.redirect) : route;
  };

  const renderRoute = (toPath = window.location.hash) => {
    const proceed = (path = toPath) => {
      const { component } = getRoute(path);

      if (typeof component !== "object") {
        throw new Error(`"${path}" 컴포넌트가 없습니다.`);
      }
      window.history.pushState(null, "", path);
      content.innerHTML = component.template();
      if (typeof component.domEvent === "function") {
        component.domEvent({ contentElement: content });
      }
    };

    if (guard) {
      guard(toPath, proceed);
    } else {
      proceed();
    }
  };

  return {
    start() {
      window.addEventListener("hashchange", () => renderRoute());
      renderRoute();
    },
    beforeEach(callback) {
      guard = callback;
      return this;
    },
    navigate(path) {
      window.location.hash = path;
    },
  };
}
