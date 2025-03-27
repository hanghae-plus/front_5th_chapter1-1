import MainPage from "./pages/MainPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import ErrorPage from "./pages/ErrorPage.js";
import { getUser, saveUser, logout, isLoggedIn } from "./utils/auth.js";
import { BASE_PATH } from "./constants.js";
// root element 참조
const root = document.getElementById("root");

// navigate 함수 수정
const navigate = (path) => {
  window.history.pushState({}, "", BASE_PATH + path);
  router();
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

// 라우터 수정
const router = () => {
  // 현재 경로가 basePath로 시작하지 않으면 basePath를 앞에 추가
  const currentPath = window.location.pathname;
  if (!currentPath.startsWith(BASE_PATH)) {
    const fullPath = BASE_PATH + currentPath;
    window.history.replaceState({}, "", fullPath);
  }

  const path = window.location.pathname.replace(BASE_PATH, "") || "/";

  // 로그인하지 않은 상태에서 /profile 접근 시 로그인 페이지로 리다이렉션
  if (path === "/profile" && !isLoggedIn()) {
    navigate("/login");
    return;
  }
  // 로그인된 상태에서 /login 접근 시 메인 페이지로 리다이렉션
  if (path === "/login" && isLoggedIn()) {
    navigate("/");
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
// router();
window.addEventListener("load", () => {
  router();
});

// 브라우저 뒤로가기/앞으로가기 처리
window.addEventListener("popstate", router);

// 링크 클릭 처리
document.addEventListener("click", (e) => {
  const linkElement = e.target.closest("a, [role='link']");

  if (linkElement) {
    e.preventDefault();
    const href = linkElement.getAttribute("href");
    if (href && href !== "#") {
      const fullPath = BASE_PATH + href;
      window.history.pushState({}, "", fullPath);
      router();
    }
  }
  if (e.target.matches("#logout")) {
    e.preventDefault();
    handleLogout();
  }
});

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
