// src/components/Header.js
import { pathPrefix, getCurrentPath } from "../utils/route.js";

export const Header = ({ loggedIn } = {}) => {
  const path = getCurrentPath();

  const nav = loggedIn
    ? `
        <li>
					<a href="${pathPrefix()}/profile" id="profile-route" class="${path === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a>
				</li>
        <li>
					<a href="${pathPrefix()}/" id="logout" class="text-gray-600">로그아웃</a>
				</li>
      `
    : `<li><a href="${pathPrefix()}/login" id="login-route" class="text-gray-600">로그인</a></li>`;

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
					<a href="${pathPrefix()}/" id="home-route" class="${location.pathname === "/" || location.pathname === "/front_5th_chapter1-1/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a>
				</li>
        ${nav}
      </ul>
    </nav>
  `;
};
