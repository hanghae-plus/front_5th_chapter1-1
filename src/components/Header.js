import userStore from "../store/userStore";

const Header = () => {
  const isLoggedIn = userStore.isLoggedIn();
  const isHashRouter = window.location.hash;
  const currentPath = isHashRouter
    ? window.location.hash.slice(1)
    : window.location.pathname;
  const loggedInNav = isLoggedIn
    ? `<li><a href="${isHashRouter ? "#" : ""}/profile" role="link" class="${currentPath === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>
       <li><a href="#" id="logout">로그아웃</a></li>`
    : `<li><a href="${isHashRouter ? "#" : ""}/login" class="${currentPath === "/login" ? "text-blue-600 font-bold" : "text-gray-600"}">로그인</a></li>`;

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav role="navigation" class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${currentPath === "/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
        ${loggedInNav}
      </ul>
    </nav>
  `;
};

export default Header;
