import User from "../user.js";
import { BASE_URL } from "../constants/constant.js";

const Header = () => {
  const isLogin = User.isLoggedIn();
  const sign = isLogin
    ? `<li><a id="logout" href="/login" class="text-gray-600">로그아웃</a></li>`
    : `<li><a href="/login" class="text-gray-600">로그인</a></li>`;

  const pathname =
    location.hash.replace("#", "") || location.pathname.replace(BASE_URL, "");

  const isActive = (currentPath, targetPath) => {
    return currentPath === targetPath
      ? "text-blue-600 font-bold"
      : "text-gray-600";
  };

  return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
     
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${isActive(pathname, "/")}">홈</a></li>
         ${isLogin ? `<li><a href="/profile" class="${isActive(pathname, "/profile")}">프로필</a></li>` : ""}
          ${sign}
        </ul>
      </nav>`;
};

export default Header;
