import { MainPage, LoginPage, ErrorPage, ProfilePage } from "./page";
import { clearUser, setUser } from "./store/user";

const root = document.getElementById("root");

const App = () => {
  if (location.pathname === "/") return MainPage();
  if (location.pathname === "/profile") return ProfilePage();
  if (location.pathname === "/login") return LoginPage();
  return ErrorPage();
};

const render = () => {
  root.innerHTML = App();
  route();
};

const route = () => {
  root.querySelectorAll("a").forEach((el) => {
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

//login
root.addEventListener("submit", function (event) {
  event.preventDefault();

  if (event.target && event.target.id === "login-form") {
    let username = document.getElementById("username")?.value;
    setUser({ username, bio: "", email: "" });
    history.pushState(null, "", "profile");
    render();
  }
});

root.addEventListener("click", function (evnet) {
  if (evnet.target && evnet.target.id === "logout") {
    console.log("로그아웃");
    clearUser();
    history.pushState(null, "", "login");
    render();
  }
});

render();
