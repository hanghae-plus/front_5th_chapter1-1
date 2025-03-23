import { MainPage, LoginPage, ProfilePage, ErrorPage } from "./pages";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
  404: ErrorPage,
};

const render = (path) => {
  const page = routes[path] ? routes[path]() : routes["404"]();

  document.body.innerHTML = page;
};

const handleLinkClick = (event) => {
  const link = event.target.closest("a");

  if (link && link.origin === location.origin) {
    event.preventDefault();

    history.pushState({}, "", link.pathname);

    render(link.pathname);
  }
};

const init = () => {
  window.addEventListener("popstate", () => render(location.pathname));
  document.body.addEventListener("click", handleLinkClick);

  render(location.pathname);
};

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", init)
  : init();
