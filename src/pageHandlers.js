import { ErrorPage, LoginPage, MainPage, ProfilePage } from "@/pages";
import { BASE_PATH } from "@/config/config";
import { authManager, USER, USER_DATA } from "@/utils/auth";

const isHash = window.location.hash !== "";

const PATHS = {
  MAIN: "/",
  PROFILE: "/profile",
  LOGIN: "/login",
};

export const render = () => {
  const isHash = window.location.hash !== "";

  const path = isHash
    ? window.location.hash.slice(1).replace(BASE_PATH, "")
    : window.location.pathname.replace(BASE_PATH, "");

  handlePageRendering(path);
  registerEventListeners(path);
};

const handlePageRendering = (path) => {
  let page = "";

  if (path === PATHS.MAIN) {
    page = MainPage();
  } else if (path === PATHS.PROFILE) {
    page = ProfilePage({ user: authManager.getUserData(USER) });
  } else if (path === PATHS.LOGIN) {
    page = LoginPage();
  } else {
    page = ErrorPage();
  }

  document.getElementById("root").innerHTML = page;
};

const registerEventListeners = (path) => {
  if (path === PATHS.LOGIN) {
    handleLoginPage();
  } else if (path === PATHS.PROFILE) {
    handleProfilePage();
  }
  handleLogout();
};

const navigateTo = (isHash, path) => {
  if (isHash) {
    window.location.hash = path;
  } else {
    window.history.pushState({}, "", `${BASE_PATH}${path}`);
  }
};

const handleLoginPage = () => {
  if (authManager.isLoggedIn(USER)) {
    navigateTo(isHash, PATHS.MAIN);
    render(PATHS.MAIN);
  } else {
    const form = document.getElementById("login-form");
    if (form) {
      form.addEventListener("submit", handleLoginSubmit);
    }
  }
};

const handleProfilePage = () => {
  if (!authManager.isLoggedIn(USER)) {
    navigateTo(isHash, PATHS.LOGIN);
    render(PATHS.LOGIN);
  } else {
    const form = document.getElementById("profile-form");

    if (form) {
      form.addEventListener("submit", handleProfileSubmit);
    }
  }
};

const handleLogout = () => {
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogoutClick);
  }
};

const handleProfileSubmit = (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value.trim();

  const userData = { username, email, bio };

  authManager.setUserData(USER, userData);

  navigateTo(isHash, PATHS.PROFILE);
  render(PATHS.PROFILE);
};

const handleLoginSubmit = (e) => {
  e.preventDefault();
  authManager.setUserData(USER, USER_DATA);
  navigateTo(isHash, PATHS.MAIN);
  render(PATHS.MAIN);
};

const handleLogoutClick = (e) => {
  e.preventDefault();
  authManager.logout(USER);
  navigateTo(isHash, PATHS.LOGIN);
  render(PATHS.LOGIN);
};
