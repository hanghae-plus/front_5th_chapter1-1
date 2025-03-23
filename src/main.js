import MainPage from "./pages/Main";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import ErrorPage from "./pages/Error";

const App = () => {
  const path = window.location.pathname;
  if (path === "/") return MainPage();
  if (path === "/profile") return ProfilePage();
  if (path === "/login") return LoginPage();
  return ErrorPage();
};

const render = (page) => {
  document.body.innerHTML = page;
};

render(App());
