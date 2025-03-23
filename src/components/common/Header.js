import { isLoggedIn, logout } from "../../store/Auth";
import { router } from "../../main";

const Header = () => {
  const path = window.location.pathname;

  const renderNavLinks = () => {
    if (isLoggedIn()) {
      return `
        <li><a href="/profile" class=${path === "/profile" ? "text-blue-600" : "text-gray-600"}>프로필</a></li>
        <li><button id="logout" class="text-gray-600" data-action="logout">로그아웃</button></li>
      `;
    }
    return `<li><a href="/login" class=${path === "/login" ? "text-blue-600" : "text-gray-600"}>로그인</a></li>`;
  };

  document.addEventListener("click", (e) => {
    if (e.target.matches('[data-action="logout"]')) {
      e.preventDefault();
      logout();
      router.navigate("/login");
    }
  });

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class=${path === "/" ? "text-blue-600" : "text-gray-600"}>홈</a></li>
        ${renderNavLinks()}
      </ul>
    </nav>
  `;
};

export default Header;
