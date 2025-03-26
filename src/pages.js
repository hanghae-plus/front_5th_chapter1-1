import MainPage from "./components/MainPage";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
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
