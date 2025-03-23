import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

export const Router = () => {
  switch (location.pathname) {
    case "/":
      console.log("/");
      return MainPage();
    case "/login":
      console.log("/login");
      return LoginPage();
    case "/profile":
      console.log("/profile");
      return ProfilePage();
    default:
      return ErrorPage();
  }
};
