import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import { app } from "./main.js";
import hashState from "./store/hash.js";

const detectHashPath = (hash) => {
  const HASHROUTES = {
    "#/": HomePage(),
    "#/login": LoginPage(),
    "#/profile": ProfilePage(),
  };

  if (HASHROUTES[hash]) {
    app.innerHTML = HASHROUTES[hash].template();
    HASHROUTES[hash].action();
  } else {
    app.innerHTML = NotFoundPage();
  }
};

export const hashRender = (hash) => {
  history.pushState({}, "", hash);
  detectHashPath(hash);
};

const hashRouter = () => {
  hashRender(location.hash);

  window.addEventListener("popstate", (e) => {
    e.preventDefault();
    const { hash } = location;
    hashRender(hash);
  });
};

if (location.pathname.includes("hash") || hashState.getHashState()) {
  hashState.setHashState(true);
  location.hash = "#/";
  hashRouter();
}
