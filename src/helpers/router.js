export function createRouter(root, routes) {
  let guard = null;
  const content = document.createElement("div");
  root.appendChild(content);

  const getRoute = (path) => {
    const route = routes[path] ?? routes["*"];
    return route.redirect ? getRoute(route.redirect) : route;
  };

  const renderRoute = () => {
    const callback = (toPath = window.location.pathname) => {
      const { component } = getRoute(toPath);
      if (typeof component !== "function") {
        throw new Error(`"${toPath}" 컴포넌트가 없습니다.`);
      }
      window.history.pushState(null, "", toPath);
      content.innerHTML = component();
    };

    if (guard) guard(window.location.pathname, callback);
    else callback();
  };

  const onLinkClick = (e) => {
    e.preventDefault();
    const link = e.target.closest("a");
    if (!link) return;

    const newPathname = link.href.replace(window.location.origin, "");
    const isSamePath = window.location.pathname === newPathname;
    if (isSamePath) return;

    window.history.pushState(null, "", newPathname);
    renderRoute();
  };

  return {
    start() {
      window.addEventListener("popstate", renderRoute);
      document.body.addEventListener("click", onLinkClick);
      renderRoute();
    },
    beforeEach(callback) {
      guard = callback;
      return this;
    },
  };
}
