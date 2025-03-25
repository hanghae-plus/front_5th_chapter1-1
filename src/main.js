import ProfilePage from "./pages/profilePage";
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import ErrorPage from "./pages/errorPage";
import { MOCK_POSTS } from "./mockPosts";

export const state = {
  loginState: false,
  posts: MOCK_POSTS,
};

const App = () => {
  if (location.pathname === "/login") {
    return LoginPage();
  }
  if (location.pathname === "/profile") {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return LoginPage();
    return ProfilePage({ ...user });
  }
  if (location.pathname === "/") {
    return MainPage({ ...state });
  }
  return ErrorPage();
};

window.addEventListener("popstate", () => {
  render();
});

const render = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  state.loginState = !!user;

  document.body.innerHTML = App();

  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const newPathName = e.target.href.replace(location.origin, "");
      history.pushState(null, "", newPathName);
      render();
    });
  });

  const profileForm = document.getElementById("profile-form");

  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email");
      const bio = document.getElementById("bio");
      const user = JSON.parse(localStorage.getItem("user"));
      user.email = email;
      user.bio = bio;
      localStorage.setItem("user", JSON.stringify(user));
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      login();
    });
  }

  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
};

const login = () => {
  const username = document.getElementById("username").value;
  const user = {
    username: username,
    bio: "",
    email: "",
  };
  localStorage.setItem("user", JSON.stringify(user));

  state.loginState = true;

  history.pushState(null, "", "/");
  render();
};

const logout = () => {
  localStorage.removeItem("user");

  state.loginState = false;

  history.pushState(null, "", "/login");
  render();
};

render();
