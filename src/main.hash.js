import "./main";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import hashState from "./store/hash";

const app = document.querySelector("#root");

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
  hashState.setHashState(true);
  const { pathname } = location;
  hashRender("#" + pathname);
};

window.addEventListener("hashchange", (e) => {
  e.preventDefault();
  hashRender(location.hash);
});

hashRouter();
