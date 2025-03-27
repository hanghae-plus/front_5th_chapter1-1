import MainPage from "../components/MainPage.jsx";
import ProfilePage from "../components/ProfilePage.jsx";
import LoginPage from "../components/LoginPage.jsx";
import NotFoundPage from "../components/NotFoundPage.jsx";
import { isLoggedIn, isNotLoggedIn } from "./login.js";

const routes = {
  "/": {
    component: MainPage,
  },
  "/profile": {
    component: ProfilePage,
    guard: isNotLoggedIn,
    redirect: "/login",
  },
  "/login": {
    component: LoginPage,
    guard: isLoggedIn,
    redirect: "/",
  },
  "*": {
    component: NotFoundPage,
  },
};

const push = (path, replace = false) => {
  if (App.RouterType === "basic") {
    if (replace) {
      window.history.replaceState({}, "", path);
    } else {
      window.history.pushState({}, "", path);
    }
  } else if (App.RouterType === "hash") {
    if (!path.startsWith("/")) {
      path = "/" + path;
    }
    window.location.hash = path;
  }
};

const getPath = () => {
  if (App.RouterType === "basic") {
    return window.location.pathname;
  } else if (App.RouterType === "hash") {
    if (window.location.hash.slice(1) === "") {
      return "/";
    }
    return window.location.hash.slice(1);
  }
};

export const App = {
  RouterType: "basic",
  push,
  Render() {
    const path = getPath();
    const route = routes[path] || routes["*"];

    let rendered = route.component();
    if (route.guard && route.guard()) {
      // 이전 페이지로 이동해도 다시 라우팅 가드에 걸리기 때문에 replace 옵션 추가
      App.push(route.redirect, true);
      rendered = routes[route.redirect].component();
    }

    document.getElementById("root").innerHTML = rendered;
  },
};
