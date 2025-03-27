export const Header = ({ user }) => {
  const isActive = (path) =>
    location.pathname === path ? "text-blue-600" : "text-gray-600";

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${isActive("/")}">홈</a></li>
        <li><a href="/profile" class="${isActive("/profile")}">프로필</a></li>
        <li>
            ${
              user
                ? `<a href="/" id="logout" class="text-gray-600">로그아웃</a>`
                : `<a href="/login" class="${isActive("/login")}">로그인</a>`
            }
          </li>
      </ul>
    </nav>
  `;
};
