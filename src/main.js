import MainPage from "./components/MainPage";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";

window.state = {
  loggedIn: false,
};

const Page = () => {
  switch (location.pathname) {
    case "/":
      return MainPage();
    case "/login":
      return LoginPage();
    case "/profile":
      if (window.state.loggedIn) {
        return ProfilePage();
      } else {
        history.pushState({ path: "/login" }, "", "/login");
        return LoginPage();
      }
    default:
      return ErrorPage();
  }
};

const render = () => {
  document.querySelector("#root").innerHTML = Page();
};

const router = () => {
  render();

  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const newPathname = e.target.href.replace(location.origin, "");
      history.pushState({ path: newPathname }, "", newPathname);
      router();
    });
  });
};

window.addEventListener("popstate", () => {
  router();
});

router();
