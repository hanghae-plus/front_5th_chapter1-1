// 각 페이지 컴포넌트 함수
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import router from "./router";

const isProduction = import.meta.env.MODE === "production";
const BASE = isProduction ? "/front_5th_chapter1-1" : "";

const routes = {
  [`${BASE}/`]: MainPage,
  [`${BASE}/login`]: LoginPage,
  [`${BASE}/profile`]: ProfilePage,
};

// 다른 경로로 리디렉션하는 함수
const redirectTo = (path) => {
  console.log(`Redirecting to ${path}`);
  router.navigate(path);
  return routes[path]();
};

// 라우터 기능을 처리하는 함수
const handleRouting = (path) => {
  console.log("routes - handleRouting");
  const userData = JSON.parse(localStorage.getItem("user"));
  let pageComponent;

  // 라우트 가드 로직
  // 비로그인 상태에서 프로필 페이지 이동 시 login페이지로 리다이렉션
  if (userData === null && path === "/profile") {
    console.log("Unauthorized access to profile, redirecting to login");
    return redirectTo(`${BASE}/login`);
  }
  // 로그인 상태에서 로그인 페이지 이동 시 홈으로 리다이렉션
  else if (userData !== null && path === "/login") {
    console.log(`${BASE}/login`);
    console.log("Already logged in, redirecting to home");
    return redirectTo(`${BASE}/`);
  }
  // 일반적인 경로 처리
  else {
    // 경로에 맞는 페이지 컴포넌트 반환
    pageComponent = routes[path];
  }

  if (pageComponent) {
    return pageComponent(); // 페이지 컴포넌트 실행해서 HTML 반환
  }
};

export default handleRouting;
