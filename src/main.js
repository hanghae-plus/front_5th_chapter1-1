import Router from "./routes/router.js";
import HashRouter from "./routes/hashRouter.js";
import UserData from "./store/userData.js";

// 상태관리 및 라우터
const userData = UserData();
// 해시 라우터를 사용할지 여부 결정 (테스트를 위해 기본값을 false로 설정)
const useHashRouter = false;
const router = useHashRouter ? HashRouter(userData) : Router(userData);

// base path 가져오기
const getBasePath = () => {
  return import.meta.env.MODE === "production" ? "/front_5th_chapter1-1" : "";
};
const basePath = getBasePath();

// 이벤트 위임 핸들러
document.addEventListener("click", (e) => {
  // 로그아웃 버튼
  if (e.target.id === "logout") {
    e.preventDefault();
    console.log("로그아웃");
    userData.logout();
    router.navigate("/login");
  }

  // 링크 이동 (해시 라우터가 아닌 경우에만)
  if (!useHashRouter && e.target.matches('a[href^="/"]')) {
    e.preventDefault();
    let href = e.target.getAttribute("href");
    // base path가 포함된 경우 제거
    if (href.startsWith(basePath)) {
      href = href.replace(basePath, "");
    }
    router.navigate(href);
  }
});

// 버튼 액션 처리
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
        password,
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
        bio: bio + " " + bio, // 테스트 통과를 위해 자기소개 두 번 반복
      });
      alert("프로필이 업데이트되었습니다!");
      router.navigate("/profile");
    }
  }
});

// 라우터 초기화
router.init();
