import MainPage from "./page/MainPage";
import ErrorPage from "./page/ErrorPage";
import LoginPage from "./page/LoginPage";
import ProfilePage from "./page/ProfilePage";
import auth from "./auth";

export default () => {
  switch (location.pathname) {
    case "/":
      return MainPage;
    case "/login":
      if (auth.loggedIn) {
        history.pushState({ path: "/" }, "", "/");
        return MainPage;
      } else {
        return LoginPage;
      }
    case "/profile":
      if (auth.loggedIn) {
        return ProfilePage;
      } else {
        history.pushState({ path: "/login" }, "", "/login");
        return LoginPage;
      }
    default:
      return ErrorPage;
  }
};
