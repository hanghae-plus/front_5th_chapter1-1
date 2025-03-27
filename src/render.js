import { renderPage } from "./routes";

export const render = () => {
  renderPage(location.pathname);

  document.body.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const newPathName = e.target.href.replace(location.origin, "");
      history.pushState(null, null, newPathName);

      renderPage(newPathName);
    }
  });
};

window.addEventListener("popstate", () => render());
