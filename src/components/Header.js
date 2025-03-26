import { isLoggedIn } from "../utils/auth.js";

const Header = () => {
  const loggedIn = isLoggedIn();

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" role="link" class="text-blue-600">홈</a></li>
        ${
          loggedIn
            ? `
            <li><a href="/profile" role="link" class="text-gray-600">프로필</a></li>
            <li><a href="#" id="logout" role="link" class="text-gray-600">로그아웃</a></li>
            `
            : `<li><a href="/login" role="link" class="text-gray-600">로그인</a></li>`
        }
      </ul>
    </nav>
  `;
};

export default Header;
