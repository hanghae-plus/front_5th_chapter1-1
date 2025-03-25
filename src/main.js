import ErrorPage from "./page/NotFoundPage";
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import ProfilePage from "./page/ProfilePage";
import { render } from "./render";
import store from "./store/store";
const BASE_URL =
  process.env.NODE_ENV === "production" ? "/front_5th_chapter1-1" : "";
const App = () => {
  const loggedIn = store.getState().loggedIn;
  if (location.pathname === `${BASE_URL}/profile` && !loggedIn) {
    history.pushState({}, "", `${BASE_URL}/login`);
  }
  if (location.pathname === `${BASE_URL}/login` && loggedIn) {
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
