import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js";
import Error from "./pages/Error.js";

const App = () => {
  if (location.pathname === "/login") {
    return Login();
  }
  if (location.pathname === "/profile") {
    return Profile();
  }
  if (location.pathname === "/") {
    return Main();
  }
  return Error();
};

const render = () => {
  document.body.innerHTML = App();
};

render();
