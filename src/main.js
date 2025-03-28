import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import { getLoginStatus } from "./utils/getLoginStatus";

const routes = {
  "/": () => HomePage(),
  "/login": () => LoginPage(),
  "/profile": () => ProfilePage(),
  404: () => ErrorPage(),
};

function loadContent(content) {
  document.getElementById("root").innerHTML = content();
}

function navigate(path) {
  window.history.replaceState({}, "", path);
}

function handleRoute() {
  const isLoggedIn = getLoginStatus();
  const path = window.location.pathname;
  const page = routes[path];

  // 로그인한 사용자가 로그인 페이지 접근 시, 홈으로 이동
  if (isLoggedIn && path === "/login") {
    navigate("/");
    loadContent(() => HomePage());
    return;
  }

  // 로그인 안한 사용자가 프로필 접근 시, 로그인으로 이동
  if (!isLoggedIn && path === "/profile") {
    navigate("/login");
    loadContent(() => LoginPage());
    return;
  }

  if (page) {
    navigate(path);
    loadContent(page);
  } else {
    loadContent(() => ErrorPage());
  }
}

const handleClick = (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    const href = e.target.getAttribute("href"); // e.target.href 는 전체 URL, getAttribute 는 상대 경로만
    switch (href) {
      case "#":
        localStorage.removeItem("user");
        navigate("/login");
        handleRoute();
        break;

      case "/login":
        navigate("/login");
        handleRoute();
        break;

      case "/profile":
        navigate("/profile");
        handleRoute();
        break;

      default:
        navigate("/");
        handleRoute();
        break;
    }
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  // 로그인
  if (e.target.id === "login-form") {
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    if (username.value) {
      localStorage.setItem(
        "user",
        JSON.stringify({ username: username.value, email: "", bio: "" }),
      );
      username.value = "";
      password.value = "";

      navigate("/");
      handleRoute();
    }
  }

  // 프로필 업데이트
  if (e.target.id === "profile-form") {
    const username = e.target.querySelector("#username").value;
    const email = e.target.querySelector("#email").value;
    const bio = e.target.querySelector("#bio").value;
    localStorage.setItem("user", JSON.stringify({ username, email, bio }));
  }
};

// 렌더가 되고 이벤트 등록
window.addEventListener("DOMContentLoaded", () => handleRoute());
window.addEventListener("popstate", () => handleRoute());

// 이벤트 위임
document.body.addEventListener("click", handleClick);
document.body.addEventListener("submit", handleSubmit);
