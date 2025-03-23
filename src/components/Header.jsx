import { isLoggedIn } from "../utils/login";

const Header = () => `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
`;

const Nav = (now) => `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="${now === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
      <li><a href="/profile" class="${now === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
      ${
        isLoggedIn()
          ? `<li><a id="logout" href="#" class="text-gray-600">로그아웃</a></li>`
          : `<li><a href="/login" class="text-gray-600">로그인</a></li>`
      }
    </ul>
  </nav>
`;

export { Header, Nav };
