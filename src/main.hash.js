import { $ } from "./utils/dom";
import { HashRouter } from "./router/router";
import { ROUTES_MAP } from "./router/routes";
import { user } from "./store";

const router = new HashRouter({
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

const $root = $("#root");

$root.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName === "A") {
    e.preventDefault();
    router.push(e.target.href.replace(location.origin, ""));
  }
});

$root.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logout") {
    user.logout();
    router.push(ROUTES_MAP.LOGIN);
  }
});

$root.addEventListener("submit", (e) => {
  if (e.target && e.target.id === "login-form") {
    e.preventDefault();
    const username = e.target.querySelector("#username").value;
    user.login(username);
    router.push(ROUTES_MAP.HOME);
  }

  if (e.target && e.target.id === "profile-form") {
    e.preventDefault();
    const username = e.target.querySelector("#username").value;
    const email = e.target.querySelector("#email").value;
    const bio = e.target.querySelector("#bio").value;

    user.setUser({ username, email, bio });
  }
});

window.addEventListener("error", () => {
  router.push(ROUTES_MAP.NOT_FOUND);
});
