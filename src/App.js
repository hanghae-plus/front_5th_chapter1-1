import { HomePage } from "./home/page";
import ProfilePage from "./profile/page";
import router from "./module/route";
import layout from "./layout/layout";
import LoginPage from "./login/page";
import nav from "./layout/nav";
import NotFoundPage from "./error/404";

// 페이지 컨텐츠 가져오기
const getPageContent = (path) => {
  switch (path) {
    case "/":
      return HomePage();
    case "/profile":
      return ProfilePage();
    case "/login":
      return LoginPage();
    default:
      return NotFoundPage();
  }
};

// 레이아웃이 필요한 페이지 여부
const needsLayout = (path) => {
  return path === "/" || path === "/profile";
};

// 렌더링 함수 - 레이아웃 여부, 콘텐츠만 렌더링되게 처리
const render = () => {
  const root = document.getElementById("root");
  const path = router.getCurrentPath();
  const content = getPageContent(path);
  const isLayoutPage = needsLayout(path);

  const hasLayout = document.getElementById("content") !== null; // 레이아웃 적용 상태 여부

  if (isLayoutPage) {
    if (hasLayout) {
      document.getElementById("content").innerHTML = content;
      document.getElementById("nav").innerHTML = nav();
    } else {
      root.innerHTML = layout(content);
    }
  } else {
    root.innerHTML = content;
  }
};

// 라우트 변경 이벤트 처리
window.addEventListener("routechange", () => {
  render();
});

// 인증 상태 변경 이벤트 처리
window.addEventListener("authchange", () => {
  render();
});

// 초기 렌더링
render();

// 라우트 초기화
router.init();

export default render;
