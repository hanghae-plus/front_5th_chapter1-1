import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js";
import Error from "./pages/Error.js";

const routes = {
  "/login": Login,
  "/profile": Profile,
  "/": Main,
};
const navigateTo = (path) => {
  history.pushState(null, "", path);
  render();
};

const handleLink = () => {
  const links = document.querySelectorAll("a");
  links.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const newPath = e.target.getAttribute("href");
      navigateTo(newPath);
      render();
    });
  });
};

const render = () => {
  const App = routes[location.pathname] ? routes[location.pathname] : Error;
  document.body.innerHTML = App();
  handleLink();
};

window.addEventListener("popstate", render);

render();
