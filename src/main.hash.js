import globalState from "./lib/globalState.js";
import MainPage from "./pages/MainPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import ErrorPage from "./pages/ErrorPage.js";

//routing 연결
const routePath = {
  "#/": MainPage,
  "#/login": LoginPage,
  "#/profile": ProfilePage,
};

//페이지 렌더링
const renderPage = (path) => {
  // 경로가 routePath에 존재하는지 확인
  console.log("hash path", path);

  const routeHandler = routePath[path];

  // 경로가 유효하고 함수인 경우
  if (typeof routeHandler === "function") {
    return routeHandler();
  }

  // 경로가 유효하지 않거나 함수가 아닌 경우 ErrorPage 반환
  return ErrorPage();
};

//로그아웃 처리, hash와 동일로직
const logoutUser = () => {
  // 로그아웃 처리 로직
  // localStorage의 데이터 제거
  console.log("logoutUser 실행");
  // localStorage.removeItem("user");
  globalState.initUser("user");
};

//헤더 링크 클릭 (로직이 거의 동일한데 살짝 다름 95% 동일)
const handleLinkClick = (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const href = event.target.getAttribute("href");
    if (href === "#/logout") {
      console.log("logout 실행");
      // 로그아웃 처리 로직
      logoutUser(); // 로그아웃 함수 호출
      navigateTo("#/login");
      return;
    }
    navigateTo(href);
  }
};

//로그인 처리 (거의 동일)
const handleLogin = (event) => {
  event.preventDefault(); // 기본 폼 제출 방지

  const username = document.getElementById("username").value;
  const password = document.getElementById("userPw").value;

  if (username === "testuser") {
    const user = {
      username: username,
      email: "",
      bio: "",
    };
    globalState.setUser("user", user);
    // localStorage.setItem("user", JSON.stringify(user));
    navigateTo("#/profile");
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
  const hash = window.location.hash || "#/";
  navigateTo(hash);
};

//페이지 이동함수
const navigateTo = (path) => {
  //hash 이벤트 정의
  window.location.hash = path;
  //페이지 렌더링
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = renderPage(path);
  const userData = globalState.getUser("user");

  // 로그인 페이지일 때 이벤트 리스너 등록
  if (path === "#/login") {
    if (userData) {
      console.log("userData", userData);
      navigateTo("#/");
      return;
    }
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", handleLogin);
    }
  }

  if (path === "#/profile") {
    if (!userData) {
      navigateTo("#/login");
      return;
    }
    const profileForm = document.getElementById("profile-form");
    if (profileForm) {
      profileForm.addEventListener("submit", handleUpdateProfile);
    }
  }

  if (path !== "#/login" && path !== "#/logout") {
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

//첫 Dom이 로드되었을 때.
document.addEventListener("DOMContentLoaded", () => {
  App();
});

//hashchange event 처리
window.addEventListener("hashchange", () => {
  const hash = window.location.hash || "#/";
  console.log("hashchange event 처리", hash);
  navigateTo(hash);
});
