export function createRouter(root, routes) {
  let guard = null;
  const content = document.createElement("div");
  root.appendChild(content);

  const getRoute = (path) => {
    const route = routes[path] ?? routes["*"];
    return route.redirect ? getRoute(route.redirect) : route;
  };

  const renderRoute = (toPath = window.location.pathname) => {
    const proceed = (path = toPath) => {
      const { component } = getRoute(path);

      if (typeof component !== "object") {
        throw new Error(`"${path}" 컴포넌트가 없습니다.`);
      }
      window.history.pushState(null, "", path);
      content.innerHTML = component.template();
      if (typeof component.domEvent === "function")
        component.domEvent({ contentElement: content });
    };

    if (guard) {
      guard(toPath, proceed);
    } else {
      proceed();
    }
  };

  const onLinkClick = (e) => {
    const link = e.target.closest("#menu a");
    if (!link) return;

    e.preventDefault();
    const newPathname = link.href.replace(window.location.origin, "");
    const isSamePath = window.location.pathname === newPathname;
    if (isSamePath) return;
    renderRoute(newPathname);
  };

  return {
    start() {
      window.addEventListener("popstate", () => renderRoute());
      document.body.addEventListener("click", onLinkClick);
      renderRoute();
    },
    beforeEach(callback) {
      guard = callback;
      return this;
    },
    navigate(path) {
      renderRoute(path);
    },
  };
}
