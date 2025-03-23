import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

export const Router = () => {
  switch (location.pathname) {
    case "/":
      return MainPage();
    case "/login":
      return LoginPage();
    case "/profile":
      return ProfilePage();
    default:
      return ErrorPage();
  }
};
