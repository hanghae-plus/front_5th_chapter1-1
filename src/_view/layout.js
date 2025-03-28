import { ROUTE } from "../_router/constants.js";
import { createPath, normalizePath } from "../_utils/index.js";

/**
 * Layout 클래스
 * @static getNavigationLinks - 현재 경로와 사용자 상태에 따른 네비게이션 링크 생성
 * @static header - 로고와 네비게이션을 포함한 헤더 섹션
 * @static footer - 푸터 섹션
 * @static render - 전체 레이아웃 구조 렌더링
 */
class Layout {
  static getNavigationLinks(userInfo, currentPath) {
    const isLoggedIn = !!userInfo.username;

    const navItems = getDefaultNavItems(isLoggedIn);
    const cleanPath = normalizePath(currentPath);

    return navItems
      .filter((item) => item.visible) // show -> visible로 변경
      .map((item) => {
        const isActive = cleanPath === item.path;
        const className = isActive
          ? "text-blue-600 font-bold"
          : "text-gray-600";

        const fullPath = createPath(item.path);

        return `
          <li>
            <a href="${fullPath}" id="${item.id}" class="${className}">
              ${item.text}
            </a>
          </li>
        `;
      })
      .join("");
  }

  static header(userInfo) {
    const currentPath = location.hash
      ? location.hash.slice(1)
      : location.pathname;

    return /*html*/ `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${this.getNavigationLinks(userInfo, currentPath)}
        </ul>
      </nav>
    `;
  }

  static footer() {
    return /*html*/ `
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    `;
  }

  static render(userInfo, contents) {
    return /*html*/ `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${this.header(userInfo)}
          <main class="p-4">
            ${contents}
          </main>
          ${this.footer()}
        </div>
      </div>
    `;
  }
}

export default Layout;

const getDefaultNavItems = (isLoggedIn) => [
  {
    path: ROUTE.main,
    id: "home",
    text: "홈",
    visible: true,
  },
  {
    path: ROUTE.profile,
    id: "profile",
    text: "프로필",
    visible: isLoggedIn,
  },
  {
    path: ROUTE.logout,
    id: "logout",
    text: "로그아웃",
    visible: isLoggedIn,
  },
  {
    path: ROUTE.login,
    id: "login-link",
    text: "로그인",
    visible: !isLoggedIn,
  },
];
