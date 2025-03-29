import HomePage from "./components/page/home";
import ProfilePage from "./components/page/profile";
import LoginPage from "./components/page/login";
import NotFoundPage from "./components/page/notFound";
import { isLoggedIn } from "./utils/login";

const ROUTE_TYPE = window.location.hash ? "hash" : "history"; // hash, history 왜 나눴을까 나는? 네?

// 라우트 객체 : 라우트 경로와 해당 경로에 대한 페이지 컴포넌트 매핑
const routes = {
  "/": HomePage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "*": NotFoundPage,
};

// 라우팅 함수 : URL이 변경된 후, popstate 이벤트리스너로 트리거되어서 실행
function handleRoute() {
  let path;
  window.location.hash
    ? (path = window.location.hash.slice(1))
    : (path = window.location.pathname);
  let page;

  if (path === "/profile") {
    if (!isLoggedIn()) {
      // 로그인 페이지로 리다이렉트
      if (ROUTE_TYPE === "hash") {
        window.location.hash = "/login";
      } else {
        window.history.replaceState({}, "", "/login");
      }
      page = routes["/login"];
    } else {
      // URL을 /profile로 유지하고 프로필 페이지 표시
      if (ROUTE_TYPE === "hash") {
        window.location.hash = "/profile";
      } else {
        window.history.replaceState({}, "", "/profile");
      }
      page = routes["/profile"];
    }
  } else if (path === "/login") {
    if (isLoggedIn()) {
      if (ROUTE_TYPE === "hash") {
        window.location.hash = "/";
      } else {
        window.history.replaceState({}, "", "/");
      }
      page = routes["/"];
    } else {
      if (ROUTE_TYPE === "hash") {
        window.location.hash = "/login";
      } else {
        window.history.replaceState({}, "", "/login");
      }
      page = routes["/login"];
    }
  } else {
    page = routes[path] || routes["*"];
  }
  renderContent(page());
}

// 렌더링 함수
function renderContent(content) {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  rootElement.innerHTML = content;

  if (window.location.pathname === "/profile") {
    const user = JSON.parse(localStorage.getItem("user"));
    // updateProfile 함수는 DOM이 완전히 렌더링 되고 나서 호출해야함 (라우트 단에서 할 수 없음)
    updateProfile(user);
  }
}

// 사용자 정보 저장
function updateProfile(user) {
  const profileForm = document.getElementById("profile-form");
  if (!profileForm) return;

  // 프로필 폼 요소 가져오기
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const bioInput = document.getElementById("bio");

  usernameInput.value = user.username || "";
  emailInput.value = user.email || "";
  bioInput.value = user.bio || "";
}

// popstate 이벤트 리스너
window.addEventListener("popstate", handleRoute);

// hashchange 이벤트 리스너
window.addEventListener("hashchange", handleRoute);

// REVIEW:로드 이벤트 리스너
// window.addEventListener("load", handleRoute);
handleRoute();

function navigate(path) {
  if (ROUTE_TYPE === "hash") {
    const hashPath = "/" + path.split("/").pop();
    window.location.hash = hashPath;
  } else {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate")); // popstate 이벤트 (강제) 실행
  }
}

// 네비게이션 요소 연결
// 클릭 이벤트 리스너
window.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    navigate(link.href);
  } else if (e.target.id === "login") {
    if (!isLoggedIn()) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      localStorage.setItem(
        "user",
        JSON.stringify({ username, email: "", bio: "" }),
      );
    }
    navigate("/"); // 로그인 후 홈으로 이동
  } else if (e.target.id === "logout") {
    console.log("logout");
    e.preventDefault();
    localStorage.removeItem("user");
    if (ROUTE_TYPE === "hash") {
      window.location.hash = "/login";
    } else {
      window.history.replaceState({}, "", "/login");
    }
    handleRoute();
  }
});

// 폼 제출 이벤트 리스너
window.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.id === "login-form") {
    const username = document.getElementById("username").value;
    localStorage.setItem(
      "user",
      JSON.stringify({ username, email: "", bio: "" }),
    );
    navigate("/"); // 로그인 후 홈으로 이동
  } else if (e.target.id === "profile-form") {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;
    localStorage.setItem("user", JSON.stringify({ username, email, bio }));
    // handleRoute(); // 제출 후 페이지 리렌더링
    renderContent(routes["/profile"]()); // 프로필 페이지 리렌더링
  }
});
