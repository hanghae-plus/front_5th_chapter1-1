import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { ErrorPage } from "./pages/ErrorPage";
import { $ } from "./dom";
import { user } from "./store";

const routes = [
  { hash: "#/", component: MainPage, authRequired: false },
  { hash: "#/login", component: LoginPage, authRequired: false },
  { hash: "#/profile", component: ProfilePage, authRequired: true },
];

const navigate = (pathname) => {
  location.hash = pathname;
};

const $root = $("#root");

const render = () => {
  const { hash } = location;

  const route = routes.find((route) => route.hash === hash);
  const loggedIn = user.loggedIn();

  if (!route) {
    $root.innerHTML = ErrorPage();
  }

  if (route.requiresAuth && !loggedIn) {
    location.hash = "#/login";
    $root.innerHTML = LoginPage();
    return;
  }

  if (hash === "#/login" && loggedIn) {
    location.hash = "#/";
    $root.innerHTML = MainPage();
    return;
  }

  $root.innerHTML = route.component();
};

window.addEventListener("hashchange", render);

$root.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName === "A") {
    e.preventDefault();

    navigate(e.target.href.replace(location.origin, ""));
  }
});

$root.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logout") {
    user.logout();
    navigate("#/login");
    render();
  }
});

$root.addEventListener("submit", (e) => {
  if (e.target && e.target.id === "login-form") {
    e.preventDefault();
    const username = e.target.querySelector("#username").value;

    user.login(username);

    navigate("#/");
    render();
  }

  if (e.target && e.target.id === "profile-update-form") {
    e.preventDefault();
    const username = e.target.querySelector("#username").value;
    const email = e.target.querySelector("#email").value;
    const bio = e.target.querySelector("#bio").value;

    user.setUser({ username, email, bio });
    render();
  }
});

render();
