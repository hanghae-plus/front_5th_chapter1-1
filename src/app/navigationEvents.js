import { authStore } from "../features/auth";

export function setupNavigationClickEvents(router) {
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      const href = e.target.getAttribute("href");
      if (href && href.startsWith("/")) {
        e.preventDefault();

        if (e.target.id === "logout") {
          authStore.logout();
        }

        router.navigateTo(href);
      }
    }
  });
}
