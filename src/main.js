import ErrorPage from "./page/NotFoundPage";
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import ProfilePage from "./page/ProfilePage";
import { render } from "./render";
import store from "./store/store";

const App = () => {
  const loggedIn = store.getState().loggedIn;
  if (location.pathname === "/profile" && !loggedIn) {
    history.pushState({}, "", "/login");
  }
  if (location.pathname === "/login" && loggedIn) {
    history.pushState({}, "", "/");
  }
  switch (location.pathname) {
    case "/login":
      return `${LoginPage()}`;
    case "/profile":
      return `${ProfilePage()}`;
    case "/":
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
