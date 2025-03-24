import { homePage } from "./pages/home.js";
import { ProfilePage } from "./pages/profile.js";
import { LoginPage } from "./pages/login.js";
import { ErrorPage } from "./pages/error.js";

// import state from "./store/state.js";

const App = () => {
  switch (window.location.pathname) {
    case "/":
      return homePage();
    case "/profile":
      return ProfilePage();
    case "/login":
      return LoginPage();
    default:
      return ErrorPage();
  }
};

window.addEventListener("popstate", () => {
  render();
});

const render = () => {
  document.body.innerHTML = App();

  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      const newPathName = e.target.href.replace(location.origin, "");
      history.pushState(null, "", newPathName);
      render();
    });
  });
};

render();
