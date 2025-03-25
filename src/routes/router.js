import Home from "../components/pages/Home.js";
import Login from "../components/pages/Login.js";
import Profile from "../components/pages/Profile.js";
import NotFound from "../components/pages/NotFound.js";
import store from "../store/store.js";

// 라우트 정의
const routes = [
  { path: "/", component: Home, requiresAuth: false },
  { path: "/login", component: Login, requiresAuth: false },
  { path: "/profile", component: Profile, requiresAuth: true },
];

const root = document.getElementById("root");

const router = () => {
  // 현재 경로 가져오기
  const path = window.location.pathname;

  const isLoggedIn = store.getState("isLoggedIn");

  // 이미 로그인된 경우 로그인 페이지 접근 시 홈으로 리다이렉트
  if (path === "/login" && isLoggedIn) {
    window.history.pushState({}, "", "/");
    render("/");
    return;
  }

  // 일치하는 라우트 찾기
  let route = routes.find((route) => route.path === path);

  // 인증이 필요한 라우트인데 로그인이 안 되어 있으면 로그인 페이지로 리다이렉트
  if (route && route.requiresAuth && !isLoggedIn) {
    window.history.pushState({}, "", "/login");
    render("/login");
    return;
  }

  // 라우트가 없으면 404 페이지
  if (!route) {
    root.innerHTML = NotFound();
  } else {
    root.innerHTML = route.component();
  }

  setupEventHandlers();
};

/** 라우트 경로에 해당하는 페이지 렌더링 */
const render = (path) => {
  const route = routes.find((route) => route.path === path);
  if (route) {
    root.innerHTML = route.component();
    setupEventHandlers();
  }
};

/** 내부 링크 처리 */
const setupLinks = () => {
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // 클릭된 링크의 href의 속성값을 가져옴
      const href = link.getAttribute("href");

      // 외부 링크나, 앵커 링크는 기본 동작 유지
      if (!href || href.startsWith("http") || href.startsWith("#")) {
        return;
      }
      // a 태그의 페이지 이동 동작을 막음, 즉 브라우저가 직접 URL을 변경하지 않음
      e.preventDefault();

      navigateTo(href);
    });
  });
};

/** 네비게이션 함수 */
const navigateTo = (path) => {
  window.history.pushState({}, "", path);
  router();
};

const initRouter = () => {
  // 초기 라우팅
  router();
};

// 모든 이벤트 핸들러 설정
const setupEventHandlers = () => {
  // 링크 클릭 처리
  setupLinks();
  // 로그인 이벤트 처리
  handleLogin();
  // 로그아웃 이벤트 처리
  handleLogout();
  // 프로필 업데이트 이벤트 처리
  handleUpdateProfile();
};

const handleLogin = () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // FormData에서 사용자 이름과 비밀번호 추출
      const username = document.getElementById("username").value;

      // 사용자 이름을 로컬스토리지에 저장
      const userData = {
        username: username,
        email: "",
        bio: "",
      };

      store.setState("isLoggedIn", true);
      store.setState("user", userData);

      navigateTo("/profile");
    });
  }
};

const handleLogout = () => {
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();

      store.setState("isLoggedIn", false);
      store.setState("user", null);
      navigateTo("/login");
    });
  }
};

const handleUpdateProfile = () => {
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const bio = document.getElementById("bio").value;

      const userData = { username, email, bio };
      store.setState("user", userData);

      alert("프로필이 업데이트되었습니다.");
    });
  }
};

store.subscribe("isLoggedIn", router);

// popstate 이벤트 리스너 - 뒤로가기, 앞으로가기 버튼 처리
window.addEventListener("popstate", router);

export { initRouter, navigateTo, router };
