import { state } from "../state";

const getNavClass = (path) => {
  const currentPath = window.location.pathname;
  return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
};

const Navigation = () => {
  if (!state.isLoggedIn) {
    return `<li><a href="/login" class="${getNavClass("/login")}" data-link>로그인</a></li>`;
  }

  return `
    <li><a href="/profile" class="${getNavClass("/profile")}" data-link>프로필</a></li>
    <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
  `;
};

export const Header = () => `
<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${getNavClass("/")}">홈</a></li>
         ${Navigation()}
        </ul>
      </nav>
      `;
