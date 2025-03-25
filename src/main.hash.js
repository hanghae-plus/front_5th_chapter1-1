import {
  ErrorPage,
  getLocalStorage,
  LoginPage,
  MainPage,
  ProfilePage,
  removeLocalStorage,
  setLocalStorage,
} from "./main.js";

const state = {
  isLoggedIn: false,
};

const App = () => {
  if (location.hash === "#/") {
    return MainPage();
  }
  if (location.hash === "#/login") {
    return LoginPage();
  }
  if (location.hash === "#/profile") {
    if (state.isLoggedIn) {
      return ProfilePage();
    } else {
      location.hash = "#/login";
      return LoginPage();
    }
  }
  return ErrorPage();
};

const render = () => {
  document.querySelector("#root").innerHTML = App();

  const $ul = document.querySelector("ul");
  const $loginForm = document.getElementById("login-form");
  const $usernameInput = document.getElementById("username");
  const $logoutButton = document.getElementById("logout");

  if ($ul) {
    $ul.addEventListener(
      "click",
      (e) => {
        if (e.target.tagName === "A") {
          e.preventDefault();
          const href = e.target.getAttribute("href").replace("/", "");
          location.hash = `#/${href}`;
          render();
        }
      },
      false,
    );
  }

  if ($loginForm) {
    $loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if ($usernameInput.value !== "") {
        setLocalStorage("user", {
          username: $usernameInput.value,
          email: "",
          bio: "",
        });
        location.hash = "#/profile";
        state.isLoggedIn = true;
        render();
      } else {
        alert("아이디 필수");
      }
    });
  }

  if ($logoutButton) {
    $logoutButton.addEventListener("click", () => {
      location.hash = "#/login";
      state.isLoggedIn = false;
      removeLocalStorage("user");
      render();
    });
  }

  if (location.hash === "#/profile") {
    const $profileForm = document.getElementById("profile-form");
    const $username = document.getElementById("username");
    const $email = document.getElementById("email");
    const $bio = document.getElementById("bio");

    const userInfo = getLocalStorage("user");

    $username.value = userInfo.username;
    $email.value = userInfo.email;
    $bio.value = userInfo.bio;

    $profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      setLocalStorage("user", {
        username: userInfo.username,
        email: userInfo.email,
        bio: $bio.value,
      });

      alert("프로필이 업데이트 되었습니다.");
    });
  }
};

window.addEventListener("hashchange", () => {
  render();
});

render();
