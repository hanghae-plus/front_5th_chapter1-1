import { state } from "./store/state.js";
import { createHashRouter } from "./router/router.js";
import { ROUTE_PATHS, routes } from "./router/routes.js";

const root = document.body.querySelector("#root");

const router = createHashRouter({
  mount: root,
  routes,
  beforeEnter: (to, next) => {
    if (to.requiresAuth && !state.loggedIn) {
      next(ROUTE_PATHS.LOGIN);
    } else if (to.path === ROUTE_PATHS.LOGIN && state.loggedIn) {
      next(ROUTE_PATHS.MAIN);
    } else {
      next();
    }
  },
});

const onClickLogout = (e) => {
  e.preventDefault();
  state.logout();
  router.push(ROUTE_PATHS.LOGIN);
};

const onClickNavLink = (e) => {
  e.preventDefault();
  router.push(e.target.href.replace(location.origin, ""));
};

const onLoginFormSubmit = (e) => {
  e.preventDefault();
  const username = e.target.querySelector("#username").value;
  state.setUser({ username, email: "", bio: "" });
  router.push(ROUTE_PATHS.MAIN);
};

const onProfileFormSubmit = (e) => {
  e.preventDefault();
  const username = e.target.querySelector("#username").value;
  const email = e.target.querySelector("#email").value;
  const bio = e.target.querySelector("#bio").value;
  state.setUser({ username, email, bio });
};

root.addEventListener("click", (e) => {
  if (e.target?.id === "logout") {
    onClickLogout(e);
  } else if (e.target?.nodeName === "A") {
    onClickNavLink(e);
  }
});

root.addEventListener("submit", (e) => {
  if (e.target && e.target.id === "login-form") {
    onLoginFormSubmit(e);
  } else if (e.target && e.target.id === "profile-form") {
    onProfileFormSubmit(e);
  }
});
