import userStore from "./store/userStore";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export const routes = {
  "/": () => Home(),
  "/login": () => {
    if (userStore.isLoggedIn()) {
      navigate("/");
      return Home();
    }
    return Login();
  },
  "/profile": () => {
    if (!userStore.isLoggedIn()) {
      navigate("/login");
      return Login();
    }
    return Profile();
  },
};

export const navigate = (path) => {
  window.history.pushState({}, "", path);
  render(); // TODO: 필요한지 확인
};

export const render = () => {
  const root = document.getElementById("root");
  root.innerHTML = App();
};

const App = () => {
  const path = window.location.pathname;
  const PageComponent = routes[path] || (() => NotFound());
  return PageComponent();
};
