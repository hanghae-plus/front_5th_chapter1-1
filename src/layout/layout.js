import footer from "./footer.js";
import header from "./header.js";
import nav from "./nav.js";

const layout = (content) => {
  return /* HTML */ `
    <div id="app" class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <!-- 헤더 -->
        <div id="header">${header()}</div>

        <!-- 네비게이션 -->
        <div id="nav">${nav()}</div>

        <!-- 메인 컨텐츠 -->
        <div id="content">${content}</div>

        <!-- 푸터 -->
        <div id="footer">${footer()}</div>
      </div>
    </div>
  `;
};

export default layout;
