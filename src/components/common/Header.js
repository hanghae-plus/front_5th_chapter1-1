import { isLoggedIn } from "../../store/auth";
import { getRouter } from "../../router";

const Header = () => {
  const router = getRouter();
  const path = router.currentPath;

  const renderNavLinks = () => {
    if (isLoggedIn()) {
      return `
        <li><a href="${router.getLinkHref("/profile")}" class=${path === "/profile" ? "text-blue-600" : "text-gray-600"}>프로필</a></li>
        <li><a id="logout" href="#" class="text-gray-600" data-action="logout">로그아웃</a></li>
      `;
    }
    return `<li><a href="${router.getLinkHref("/login")}" class=${path === "/login" ? "text-blue-600" : "text-gray-600"}>로그인</a></li>`;
  };

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="${router.getLinkHref("/")}" class="${path === "/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
        ${renderNavLinks()}
      </ul>
    </nav>
  `;
};

export default Header;
