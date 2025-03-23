const getLinkClass = (current, target) =>
  current === target ? "text-blue-600" : "text-gray-600";

const Header = ({ path, isLoggedIn }) => {
  const logoutNav = `
      <li><a href="/profile" class="${getLinkClass(path, "/profile")}">프로필</a></li>
      <li><a id="logout" href="#" class="text-gray-600">로그아웃</a></li>
  `;
  const loginNav = `
      <li><a href="/login" class="${getLinkClass(path, "/login")}">로그인</a></li>
  `;

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
      <nav class="bg-white shadow-md p-2">
        <ul class="flex justify-around">
          <li><a href="/" class="${getLinkClass(path, "/")}">홈</a></li>
          ${isLoggedIn ? logoutNav : loginNav}
        </ul>
      </nav>
    </header>
  `;
};

export default Header;
