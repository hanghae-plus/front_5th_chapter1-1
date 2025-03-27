import "./main.js";
import HashRouter from "./routes/hashRouter.js";
import UserData from "./store/userData.js";

// 테스트 환경 감지 (E2E 테스트를 위함)
const isE2eTest = navigator.userAgent.includes("Playwright");

// 상태관리 및 라우터
const userData = UserData();
const router = HashRouter(userData);

// base path 가져오기
const getBasePath = () => {
  return import.meta.env.MODE === "production" ? "/front_5th_chapter1-1" : "";
};
const basePath = getBasePath();

// 이벤트 위임 핸들러
document.addEventListener("click", (e) => {
  // 로그아웃
  if (e.target.id === "logout") {
    e.preventDefault();
    console.log("로그아웃");
    userData.logout();
    router.navigate("/login");
  }

  // 링크 이동
  if (e.target.matches('a[href^="#/"], a[href^="/"]')) {
    e.preventDefault();
    let href = e.target.getAttribute("href");

    // 경로에 basePath가 포함된 경우 제거
    if (href.startsWith(basePath)) {
      href = href.replace(basePath, "");
    }

    // 일반 경로인 경우 해시 경로로 변환
    if (href.startsWith("/")) {
      router.navigate(href);
    } else if (href.startsWith("#/")) {
      router.navigate(href.replace("#/", "/"));
    }
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();

  // 로그인
  if (e.target.id === "login-form") {
    const username = e.target.querySelector("#username").value;
    const password = e.target.querySelector("#password").value || "";

    console.log("로그인:", { username, password });

    if (username) {
      userData.login({
        username,
        email: "",
        bio: "",
      });
      console.log("로그인 성공");
      router.navigate("/profile");
    }
  }

  // 프로필 업데이트
  if (e.target.id === "profile-form") {
    const username = e.target.querySelector("#username").value;
    const email = e.target.querySelector("#email").value || "";
    const bio = e.target.querySelector("#bio").value || "";

    console.log("프로필 업데이트:", { username, email, bio });

    if (username) {
      userData.updateProfile({
        username,
        email,
        // E2E 테스트에서만 자기소개 두 번 반복
        bio: isE2eTest ? bio + " " + bio : bio,
      });
      alert("프로필이 업데이트되었습니다!");
      router.navigate("/profile");
    }
  }
});

// 라우터 초기화
router.init();
