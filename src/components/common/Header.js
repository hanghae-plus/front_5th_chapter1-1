import { isLoggedIn } from "../../store/auth";
import { getRouter } from "../../router";
import { BASE_PATH } from "../../consts/path";

const Header = () => {
  const router = getRouter();
  const path = router.currentPath;

  const renderNavLinks = () => {
    if (isLoggedIn()) {
      return `
        <li><a data-link href="/profile" class="${path === BASE_PATH + "profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
        <li><a id="logout" href="#" class="text-gray-600" data-action="logout">로그아웃</a></li>
      `;
    }
    return `<li><a data-link href="/login" class="${path === BASE_PATH + "login" ? "text-blue-600" : "text-gray-600"}">로그인</a></li>`;
  };

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a data-link href="/" class="${path === BASE_PATH ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
        ${renderNavLinks()}
      </ul>
    </nav>
  `;
};

export default Header;
