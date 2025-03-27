import ErrorPage from "./page/NotFoundPage";
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import ProfilePage from "./page/ProfilePage";
import { render } from "./render";
import store from "./store/store";
import { BASE_URL } from "./util/constants";

const App = () => {
  const isAuthenticated = store.getState().loggedIn;
  if (location.pathname === `${BASE_URL}/profile` && !isAuthenticated) {
    history.pushState({}, "", `${BASE_URL}/login`);
  }
  if (location.pathname === `${BASE_URL}/login` && isAuthenticated) {
    history.pushState({}, "", `${BASE_URL}/`);
  }
  switch (location.pathname) {
    case `${BASE_URL}/login`:
      return `${LoginPage()}`;
    case `${BASE_URL}/profile`:
      return `${ProfilePage()}`;
    case `${BASE_URL}/`:
      return `${MainPage()}`;
    default:
      return `${ErrorPage()}`;
  }
};
window.addEventListener("popstate", () => {
  render();
});
export default App;

render();
