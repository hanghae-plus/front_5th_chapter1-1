import { BoardPage } from "./board/page";
import ProfilePage from "./profile/page";
import router from "./module/route";
import layout from "./layout/layout";
import LoginPage from "./login/page";
import nav from "./layout/nav";

// 페이지 컨텐츠 가져오기
const getPageContent = (path) => {
  switch (path) {
    case "/":
      return BoardPage();
    case "/profile":
      return ProfilePage();
    case "/login":
      return LoginPage();
  }
};

// 레이아웃이 필요한 페이지 여부
const needsLayout = (path) => {
  return path === "/" || path === "/profile";
};

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

window.addEventListener("routechange", () => {
  console.log("jiwon 라우트 변경");
  render();
});

// 초기 렌더링
render();

export default render;
