import userStore from "./store/userStore";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const loginAction = (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  userStore.setUser({
    username: username,
    email: "",
    bio: "",
  });
  navigate("/profile");
};

const logoutAction = () => {
  userStore.clearUser();
  navigate("/login");
};

const profileUpdateAction = () => {
  const user = userStore.getUser();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;
  userStore.setUser({ ...user, username, email, bio });
  navigate("/profile");
};

const routes = {
  "/": () => Home(),
  "/login": () => {
    if (userStore.isLoggedIn()) {
      navigate("/");
      return Home();
    }
    return Login();
  },
  "/profile": () => {
    if (!userStore.isLoggedIn()) {
      navigate("/login");
      return Login();
    }
    return Profile();
  },
};

const navigate = (path) => {
  window.location.hash = path;
};

const App = () => {
  const path = window.location.hash.slice(1);
  const PageContent = routes[path] || (() => NotFound());
  return PageContent();
};

const render = () => {
  const root = document.getElementById("root");
  root.innerHTML = App();
};

window.addEventListener("hashchange", function () {
  render();
});
document.addEventListener("DOMContentLoaded", render);

document.addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    navigate(path);
  }

  if (e.target.matches("#logout")) {
    e.preventDefault();
    logoutAction();
  }
});

document.addEventListener("submit", (e) => {
  if (e.target.matches("#login-form")) {
    e.preventDefault();
    loginAction(e);
  }

  if (e.target.matches("#profile-form")) {
    e.preventDefault();
    profileUpdateAction();
  }
});
