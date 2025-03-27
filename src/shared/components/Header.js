import { authStore } from "../../features/auth";
import { BASE_URL } from "../constants/constants";

function Header(currentPath = "/") {
  const isLoggedIn = authStore.isLoggedIn();
  const isActive = (path) =>
    currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";

  return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="${BASE_URL}/" class="${isActive("/")}">홈</a></li>
          ${
            isLoggedIn
              ? `<li><a href="${BASE_URL}/profile" class=${isActive("/profile")}>프로필</a></li>`
              : ""
          }
          <li>
            ${
              isLoggedIn
                ? `<a id="logout" href="${BASE_URL}/login" class="text-gray-600">로그아웃</a>`
                : `<a href="${BASE_URL}/login" class="text-gray-600">로그인</a>`
            }
          </li>
        </ul>
      </nav>
    `;
}

export default Header;
