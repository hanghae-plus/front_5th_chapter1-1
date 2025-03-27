import "./main.js";
import HashRouter from "./routes/hashRouter.js";
import UserData from "./store/userData.js";

// 상태관리 및 라우터
const userData = UserData();
const router = HashRouter(userData);

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

    // 일반 경로인 경우 해시 경로로 변환
    if (href.startsWith("/")) {
      href = href.replace("/", "");
    } else if (href.startsWith("#/")) {
      href = href.replace("#/", "");
    }

    router.navigate(href);
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();

  // 로그인
  if (e.target.id === "login-form") {
    const username = e.target.querySelector("#username").value;
    const bio = e.target.querySelector("#bio").value || "";

    console.log("로그인:", { username, bio });

    if (username) {
      userData.login({
        username,
        email: "",
        bio,
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
        bio,
      });
      alert("프로필이 업데이트되었습니다!");
      router.navigate("/profile");
    }
  }
});

// 라우터 초기화
router.init();
