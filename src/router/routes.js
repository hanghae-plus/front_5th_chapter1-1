// 각 페이지 컴포넌트 함수
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

// 라우터 기능을 처리하는 함수
const handleRouting = (path) => {
  console.log("routes - handleRouting");
  const userData = JSON.parse(localStorage.getItem("user"));
  let pageComponent;

  // 비로그인 상태에서 프로필 페이지 이동 시 login페이지로 리다이렉션
  if (userData === null && path === "/profile") {
    pageComponent = routes["/login"];
  } else if (userData !== null && path === "/login") {
    pageComponent = routes["/"];
  } else {
    // 경로에 맞는 페이지 컴포넌트 반환
    pageComponent = routes[path];
  }

  if (pageComponent) {
    return pageComponent(); // 페이지 컴포넌트 실행해서 HTML 반환
  }
};

export default handleRouting;
