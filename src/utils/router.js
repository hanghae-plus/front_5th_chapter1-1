import MainPage from "../components/MainPage.jsx";
import ProfilePage from "../components/ProfilePage.jsx";
import LoginPage from "../components/LoginPage.jsx";
import NotFoundPage from "../components/NotFoundPage.jsx";
import { isLoggedIn } from "./login.js";

const routes = {
  "/": {
    component: MainPage,
  },
  "/profile": {
    component: ProfilePage,
    guard: isLoggedIn,
    redirect: "/login",
  },
  "/login": {
    component: LoginPage,
    guard: !isLoggedIn,
    redirect: "/",
  },
  "*": {
    component: NotFoundPage,
  },
};

const replace = (path) => {
  if (App.RouterType === "basic") {
    window.history.replaceState({}, "", path);
  } else if (App.RouterType === "hash") {
    window.location.hash = path;
  }
  window.dispatchEvent(new Event("popstate"));
};

export const App = {
  RouterType: "basic",
  Render() {
    const path = window.location.pathname;
    const route = routes[path] || routes["*"];

    let rendered = route.component();

    console.log(route, route.component.name);
    if (route.guard && !route.guard()) {
      rendered = routes[route.redirect].component();
    }

    document.getElementById("root").innerHTML = rendered;
  },
  push: (path) => {
    if (App.RouterType === "basic") {
      window.history.pushState({}, "", path);
    } else if (App.RouterType === "hash") {
      window.location.hash = path;
    }
    window.dispatchEvent(new Event("popstate"));
  },
  replace,
  routes: routes,
};
