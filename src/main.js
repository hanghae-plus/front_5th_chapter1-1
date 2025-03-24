import { Main, handleMain } from "./pages/Main.js";
import { Login, handleLogin } from "./pages/Login.js";
import { Profile, handleProfile } from "./pages/Profile.js";
import Error from "./pages/Error.js";
import { navigateTo } from "./utils/router.js";

const routes = {
  "/login": Login,
  "/profile": Profile,
  "/": Main,
};

const handleLink = () => {
  const links = document.querySelectorAll("a");
  links.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const newPath = e.target.getAttribute("href");
      navigateTo(newPath);
    });
  });
};

window.render = () => {
  const App = routes[location.pathname] ? routes[location.pathname] : Error;
  document.body.innerHTML = App();
  handleLink();
  if (location.pathname === "/login") handleLogin();
  if (location.pathname === "/profile") handleProfile();
  if (location.pathname === "/") handleMain();
};

window.addEventListener("popstate", window.render);

window.render();
