import { authStore } from "../stores/authStore";

export default function Nav() {
  const isLoggedIn = authStore.user;
  return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600 font-bold" data-path="/">홈</a></li>
          <li><a href="/profile" class="text-gray-600" data-path="/profile">프로필</a></li>
              ${
                isLoggedIn
                  ? '<li><a  href="/login" class="text-gray-600" data-path="/login" id="logout">로그아웃</a></li>'
                  : '<li><a href="/login" class="text-gray-600" data-path="/login" id="login-link">로그인</a></li>'
              }
        </ul>
      </nav>
`;
}
