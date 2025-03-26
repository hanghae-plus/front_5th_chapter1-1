import MainPage from "./pages/MainPage.js";
import ErrorPage from "./pages/ErrorPage.js";
import LoginPage from "./pages/LoginPage.js";
import globalState from "./lib/globalState.js";
import ProfilePage from "./pages/ProfilePage.js";
import Router from "./routes";

//routing 연결
const routePath = {
  "/login": LoginPage,
  "/profile": ProfilePage,
  "/": MainPage,
  "/error": ErrorPage,
};

//페이지 렌더링
const renderPage = (path) => {
  // 경로가 routePath에 존재하는지 확인
  const routeHandler = routePath[path];

  // 경로가 유효하고 함수인 경우
  if (typeof routeHandler === "function") {
    return routeHandler();
  }

  // 경로가 유효하지 않거나 함수가 아닌 경우 ErrorPage 반환
  return ErrorPage();
};

//로그아웃 처리
const logoutUser = () => {
  // 로그아웃 처리 로직
  // localStorage의 데이터 제거
  console.log("logoutUser 실행");
  // localStorage.removeItem("user");
  globalState.initUser("user");
};

//헤더 링크 클릭
const handleLinkClick = (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const href = event.target.getAttribute("href");
    if (href === "/logout") {
      console.log("logout 실행");
      // 로그아웃 처리 로직
      logoutUser(); // 로그아웃 함수 호출
      navigateTo("/login");
      return;
    }
    navigateTo(href);
  }
};

//로그인 처리
const handleLogin = (event) => {
  event.preventDefault(); // 기본 폼 제출 방지

  const username = document.getElementById("username").value;
  const password = document.getElementById("userPw").value;

  console.log("email", username);
  console.log("password", password);

  if (username === "testuser") {
    const user = {
      username: username,
      email: "",
      bio: "",
    };
    globalState.setUser("user", user);
    navigateTo("/profile");
  } else if (!username || !password) {
    alert("이름 또는 비밀번호를 입력해주세요.");
  } else {
    alert("이름 또는 비밀번호가 일치하지 않습니다.");
  }
};

//profile update 처리
const handleUpdateProfile = (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const bio = document.getElementById("bio").value.trim();
  // const bio = bioText + (bioText ? ` ${bioText}` : "");

  if (username) {
    const user = {
      username: username,
      email: email,
      bio: bio,
    };

    globalState.setUser("user", user);
    location.reload();
  }
};

//최초 앱 실행 함수
const App = () => {
  //아 클릭할 때 App()이 새롭게 실행되면서 초기화가 이루어지는구나.
  navigateTo(location.pathname);
};

//페이지 이동함수
const navigateTo = (path) => {
  // 여기서 spa pushState 추가.
  history.pushState(null, "", path);
  //페이지 렌더링
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = renderPage(path);

  // 로그인 페이지일 때 이벤트 리스너 등록
  if (path === "/login") {
    const userData = globalState.getUser("user");
    if (userData) {
      navigateTo("/");
      return;
    }
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", handleLogin);
    }
  }

  if (path === "/profile") {
    const loginInfo = globalState.getUser("user");
    console.log("loginInfo", loginInfo);
    if (!loginInfo) {
      navigateTo("/login");
      return;
    }
    const profileForm = document.getElementById("profile-form");
    if (profileForm) {
      profileForm.addEventListener("submit", handleUpdateProfile);
    }
  }

  if (path !== "/login" && path !== "/logout") {
    console.log("login or logout");
    const navElement = document.querySelector("nav");

    if (navElement) {
      navElement.addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
          handleLinkClick(event);
        }
      });
    }
  }
};

const router = new Router();
router.addRoute("/", () => renderPage("/"));
router.addRoute("/login", LoginPage);
router.addRoute("/profile", ProfilePage);
router.addRoute("/error", ErrorPage);

//첫 Dom이 로드되었을 때.
document.addEventListener("DOMContentLoaded", () => {
  App();
});

// popstate 이벤트 처리 popstate는 언제 발생하는건가?
window.addEventListener("popstate", () => {
  console.log("popstate 이벤트 처리");
  navigateTo(location.pathname);
});
