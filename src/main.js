import { $ } from "./utils/dom";
import { user } from "./store";
import { ROUTES_MAP } from "./router/routes";
import { BrowserRouter } from "./router/router";

const router = new BrowserRouter({
  guardRoute: (route, next) => {
    if (route.path === ROUTES_MAP.LOGIN && user.loggedIn()) {
      next(ROUTES_MAP.HOME);
    } else if (route.authRequired && !user.loggedIn()) {
      next(ROUTES_MAP.LOGIN);
    } else {
      next();
    }
  },
});

const root = $("#root");

root.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName === "A") {
    e.preventDefault();
    router.push(e.target.href.replace(location.origin, ""));
  }
});

root.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logout") {
    user.logout();
    router.push(ROUTES_MAP.LOGIN);
  }
});

root.addEventListener("submit", (e) => {
  const $form = e.target;

  if ($form.id === "login-form") {
    e.preventDefault();
    const username = $form.querySelector("#username").value;
    user.login(username);
    router.push(ROUTES_MAP.HOME);
  }

  if ($form.id === "profile-form") {
    e.preventDefault();
    const username = $form.querySelector("#username").value;
    const email = $form.querySelector("#email").value;
    const bio = $form.querySelector("#bio").value;

    user.setUser({ username, email, bio });
  }
});

window.addEventListener("error", () => {
  router.push(ROUTES_MAP.NOT_FOUND);
});
