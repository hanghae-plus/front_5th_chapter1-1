import MainPage from "./page/MainPage";
import LoginPage from "./page/LoginPage";
import ProfilePage from "./page/ProfilePage";
import NotFoundPage from "./page/NotFoundPage";
import store from "./store/store";
import { BASE_URL } from "./util/constants";
import { render } from "./hashRender";

const App = () => {
  const isAuthenticated = store.getState().loggedIn;
  if (location.hash === `${BASE_URL}#/profile` && !isAuthenticated) {
    location.hash = `${BASE_URL}#/login`;
  }
  if (location.hash === `${BASE_URL}#/login` && isAuthenticated) {
    location.hash = `${BASE_URL}#/`;
  }
  switch (location.hash) {
    case `${BASE_URL}#/login`:
      return `${LoginPage()}`;
    case `${BASE_URL}#/profile`:
      return `${ProfilePage()}`;
    case `${BASE_URL}#/`:
      return `${MainPage()}`;
    default:
      return `${NotFoundPage()}`;
  }
};

export default App;

window.addEventListener("hashchange", render);
render();
