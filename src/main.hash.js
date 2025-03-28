import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import { getLoginStatus } from "./utils/getLoginStatus";

// TODO: prefix 를 붙인다면 "index.hash.html"
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
  window.location.hash = path;
}

function handleRoute() {
  const isLoggedIn = getLoginStatus();
  const path = window.location.hash.slice(1) || "/";
  const page = routes[path]; // 페이지 들고왔지

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
    // TODO: e.target.href 로 변경
    switch (e.target.id) {
      case "logout":
        localStorage.removeItem("user");
        navigate("/login");
        break;

      case "login":
        navigate("/login");
        break;

      case "profile":
        navigate("/profile");
        break;

      default:
        navigate("/");
        break;
    }
  }
};

// TODO: submit, click 이랑 따로 두면 중복요청이 많아진다. => 왜? => 그래서 if 문으로 처리 해둔 것인데
const handleSubmit = (e) => {
  // 로그인
  if (e.target.id === "login-form") {
    e.preventDefault();
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
    }
  }

  // 프로필 업데이트
  if (e.target.id === "profile-form") {
    e.preventDefault();
    const username = e.target.querySelector("#username").value;
    const email = e.target.querySelector("#email").value;
    const bio = e.target.querySelector("#bio").value;
    localStorage.setItem("user", JSON.stringify({ username, email, bio }));
  }
};

window.addEventListener("load", () => handleRoute()); // init
window.addEventListener("hashchange", () => handleRoute()); // hashchange

document.body.addEventListener("submit", handleSubmit);
document.body.addEventListener("click", handleClick);
