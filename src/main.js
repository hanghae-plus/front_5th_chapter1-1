import MainPage from "./pages/MainPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";

const state = {
  isLoggedIn: false,
};

const navigateTo = (path) => {
  history.pushState(null, "", path);
  render();
};

const App = () => {
  console.log("path", location.pathname);
  if (location.pathname === "/login") return LoginPage();
  if (location.pathname === "/profile") {
    if (!state.isLoggedIn) {
      navigateTo("/login");
      return LoginPage();
    }
    return ProfilePage();
  }
  if (location.pathname === "/") return MainPage();
  return NotFoundPage();
};

document.body.addEventListener("click", (e) => {
  const linkEl = e.target.closest("a");
  if (linkEl) {
    e.preventDefault();
    const path = linkEl.getAttribute("href");
    navigateTo(path);
  }
  const logoutButton = e.target.closest("#logout");
  if (logoutButton) {
    e.preventDefault();
    state.isLoggedIn = false;
    localStorage.removeItem("user");
  }
});

document.body.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;

  // 로그인 폼 처리
  if (form.id === "login-form") {
    console.log("login-form");
    const userName = form.querySelector("#username").value.trim();
    const user = {
      username: userName,
      email: "",
      bio: "",
    };
    if (userName) localStorage.setItem("user", JSON.stringify(user));
    state.isLoggedIn = true;
    navigateTo("/");
  }

  // 프로필 폼 처리
  if (form.id === "profile-form") {
    const username = form.querySelector("#username").value.trim();
    const email = form.querySelector("#email").value.trim();
    const bio = form.querySelector("#bio").value.trim();
    const updatedUser = { username, email, bio };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("프로필이 저장되었습니다!");
    render();
  }
});

const init = () => {
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }
  return root;
};
const render = () => {
  const root = init(); // 항상 root 존재 보장
  root.innerHTML = App();
};

window.addEventListener("popstate", render);

render();
