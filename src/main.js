import { MainPage, LoginPage, ErrorPage, ProfilePage } from "./page";

//login state

const App = () => {
  if (location.pathname === "/") {
    return MainPage();
  }
  if (location.pathname === "/profile") {
    return ProfilePage();
  }
  if (location.pathname === "/login") {
    return LoginPage();
  }
  return ErrorPage();
};
const render = () => {
  document.body.innerHTML = App();

  route();
};

const route = () => {
  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const nextPathName = e.target.href.replace(location.origin, "");
      history.pushState(null, "", nextPathName);
      render();
    });
  });
};

window.addEventListener("popstate", () => {
  render();
});

render();
