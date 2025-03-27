import { getUser, removeUser, setUser } from "../utils/storage";
import { LoginPage, MainPage, ErrorPage, ProfilePage } from "../pages";

const HashRouter = () => {
  const path = location.hash.replace("#", "") || "/";
  console.log(path);
  const user = getUser();

  if (user && path === "/login") {
    location.hash = "/";
    HashRouter();
    return;
  }

  if (path === "/") {
    document.getElementById("root").innerHTML = MainPage(user);
  } else if (path === "/profile") {
    if (user) {
      document.getElementById("root").innerHTML = ProfilePage(user);
    } else {
      alert("로그인이 필요합니다");
    }
  } else if (path === "/login") {
    document.getElementById("root").innerHTML = LoginPage();
  } else {
    document.getElementById("root").innerHTML = ErrorPage();
  }

  goToHome();
  updateProfile();
};

const goToHome = () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const username = form.querySelector("#username").value.trim();

      if (username.length) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username, email: "", bio: "" }),
        );
        location.hash = "/";
      } else {
        alert("이메일과 비밀번호를 모두 입력해주세요.");
      }
    });
  }
};

const updateProfile = () => {
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = profileForm.querySelector("#username").value.trim();
      const email = profileForm.querySelector("#email").value.trim();
      const bio = profileForm.querySelector("#bio").value.trim();
      const user = JSON.parse(localStorage.getItem("user"));
      const updateUser = { ...user, username, email, bio };

      setUser(updateUser);
      alert("프로필이 수정되었습니다");
      location.hash = "/profile";
    });
  }
};

const goToLogin = () => {
  removeUser();
  location.hash = "/";
};

const initHashRouterEvent = () => {
  document.addEventListener("click", (e) => {
    const target = e.target.closest("a");

    if (target && target.id === "logout") {
      e.preventDefault();
      goToLogin();
    }

    if (
      target &&
      target.getAttribute("href") &&
      target.getAttribute("href").startsWith("/")
    ) {
      e.preventDefault();
      const href = target.getAttribute("href");
      location.hash = href;
    }
  });
};

export const HashApp = {
  init: () => {
    HashRouter();
    window.addEventListener("hashchange", () => {
      HashRouter();
    });
    initHashRouterEvent();
  },
};
