import { render } from "@/pageHandlers";
import { BASE_PATH } from "@/config/config";

document.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && e.target.id !== "logout") {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    window.history.pushState({}, "", `${BASE_PATH}${href}`);
    render();
  }
});

window.addEventListener("load", render);
window.addEventListener("popstate", render);
