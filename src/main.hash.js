import MainPage from "./pages/MainPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import ErrorPage from "./pages/ErrorPage.js";
import { getUser, saveUser, logout, isLoggedIn } from "./utils/auth.js";
import { BASE_PATH } from "./constants.js";
// root element 참조
const root = document.getElementById("root");

// navigate 함수 - 해시 기반 라우팅
const navigate = (path) => {
  const fullPath = BASE_PATH + path;
  window.location.hash = `${fullPath}`;
  hashRouter();
};

const handleLogin = (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  saveUser({
    username: username,
    email: "",
    bio: "",
  });
  navigate("/profile");
};

const handleLogout = () => {
  logout();
  navigate("/login");
};

const handleProfileUpdate = () => {
  const user = getUser();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;
  saveUser({ ...user, username, email, bio });
  navigate("/profile");
};

// 해시 기반 라우터 구현
const hashRouter = () => {
  const path = window.location.hash.slice(1) || BASE_PATH + "/";

  // 로그인된 상태에서 /login 접근 시 메인 페이지로 리다이렉션
  if (path === "/login" && isLoggedIn()) {
    navigate("/");
    return;
  }

  // 로그인하지 않은 상태에서 /profile 접근 시 로그인 페이지로 리다이렉션
  if (path === "/profile" && !isLoggedIn()) {
    navigate("/login");
    return;
  }

  switch (path) {
    case "/":
      root.innerHTML = MainPage();
      break;
    case "/profile":
      root.innerHTML = ProfilePage();
      break;
    case "/login":
      root.innerHTML = LoginPage();
      break;
    default:
      root.innerHTML = ErrorPage();
      break;
  }
};

// 초기 라우팅
window.addEventListener("load", () => {
  if (!window.location.hash) {
    window.location.hash = BASE_PATH + "/";
  } else {
    hashRouter();
  }
});

// 해시 변경 이벤트 처리
window.addEventListener("hashchange", hashRouter);

// 링크 클릭 처리
document.addEventListener("click", (e) => {
  const linkElement = e.target.closest("a, [role='link']");

  if (linkElement) {
    e.preventDefault();
    const href = linkElement.getAttribute("href");
    if (href && href !== "#") {
      window.location.hash = BASE_PATH + href;
      navigate(href);
    }
  }
  if (e.target.matches("#logout")) {
    e.preventDefault();
    handleLogout();
  }
});

// 폼 제출 이벤트 처리
document.addEventListener("submit", (e) => {
  if (e.target.matches("#login-form")) {
    e.preventDefault();
    handleLogin(e);
  }

  if (e.target.matches("#profile-form")) {
    e.preventDefault();
    handleProfileUpdate();
  }
});
