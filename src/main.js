import MainPage from "./components/MainPage";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import auth from "./auth";

const Page = () => {
  switch (location.pathname) {
    case "/":
      return MainPage();
    case "/login":
      return LoginPage();
    case "/profile":
      if (auth.loggedIn) {
        return ProfilePage();
      } else {
        history.pushState({ path: "/login" }, "", "/login");
        return LoginPage();
      }
    default:
      return ErrorPage();
  }
};

const render = () => {
  document.querySelector("#root").innerHTML = Page();
};

const router = () => {
  render();

  // 로그인/로그아웃 이벤트
  if (location.pathname === "/login") {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = loginForm.querySelector('input[type="text"]').value;
      // const password = loginForm.querySelector('input[type="password"]').value
      if (!username) {
        alert("사용자 이름을 입력해주세요.");
        return;
      }
      auth.login(username);
      router();
    });
  }

  const logoutForm = document.getElementById("logout");
  if (logoutForm) {
    logoutForm.addEventListener("click", () => {
      auth.logout();
    });
  }

  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const newPathname = e.target.href.replace(location.origin, "");
      history.pushState({ path: newPathname }, "", newPathname);
      router();
    });
  });
};

window.addEventListener("popstate", () => {
  router();
});

router();
