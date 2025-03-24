import ProfilePage from "./pages/profilePage";
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import ErrorPage from "./pages/errorPage";
import { MOCK_POSTS } from "./mockPosts";

export let state = {
  loginState: false,
  posts: MOCK_POSTS,
};

const App = () => {
  if (location.pathname === "/login") {
    return LoginPage();
  }
  if (location.pathname === "/profile") {
    if (!localStorage.getItem("username")) return LoginPage();
    return ProfilePage();
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
  const username = localStorage.getItem("username");
  if (username) {
    state.loggedIn = true;
  }
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

const login = () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (!username | !password)
    return alert("아이디 또는 비밀번호를 입력해주세요.");
  localStorage.setItem("username", username);
  localStorage.setItem("bio", "");
  localStorage.setItem("email", "");
  state.loginState = true;
  history.pushState(null, "", "/");
  render();
};

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
  });
}

const logout = () => {
  localStorage.removeItem("username");
  state.loginState = false;
  history.pushState(null, "", "/login");
  render();
};

const logoutButton = document.getElementById("logout");

if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}

const profileForm = document.getElementById("profile-form");

if (profileForm) {
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email");
    const bio = document.getElementById("email");
    localStorage.setItem("email", email);
    localStorage.setItem("bio", bio);
  });
}
