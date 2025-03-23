export function createRouter(root, routes) {
  const content = document.createElement("div");
  root.appendChild(content);

  const getRoute = (path) => {
    const route = routes[path] ?? routes["*"];
    return route.redirect ? getRoute(route.redirect) : route;
  };

  const renderRoute = () => {
    const { component } = getRoute(window.location.pathname);
    if (typeof component !== "function") {
      throw new Error(`"${window.location.pathname}" 컴포넌트가 없습니다.`);
    }
    content.innerHTML = component();
  };

  const onLinkClick = (e) => {
    e.preventDefault();
    const link = e.target.closest("a");
    if (!link) return;

    const newPathname = link.href.replace(window.location.origin, "");
    const isSamePath = window.location.pathname === newPathname;
    if (isSamePath) return;

    history.pushState(null, "", newPathname);
    renderRoute();
  };

  return {
    start() {
      window.addEventListener("popstate", renderRoute);
      document.body.addEventListener("click", onLinkClick);
      renderRoute();
    },
  };
}
