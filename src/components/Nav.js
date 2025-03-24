import { isAuthenticated, setLogout } from "../utils/auth.js";
import { navigateTo } from "../utils/router.js";
const handleLogout = () => {
  const logout = document.querySelector("#logout");
  if (logout) {
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      setLogout();
      navigateTo("/login");
    });
  }
};
const Nav = () => {
  const currentPath = location.pathname;
  const activeClass = "text-blue-600 hover:text-blue-400";
  const defaultClass = "text-gray-600 hover:text-blue-400";
  if (isAuthenticated()) {
    return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${currentPath === "/" ? activeClass : defaultClass}">홈</a></li>
        <li><a href="/profile" class="${currentPath === "/profile" ? activeClass : defaultClass}">프로필</a></li>
        <li><a href="#" class="text-gray-600 hover:text-blue-400" id="logout">로그아웃</a></li>
      </ul>
    </nav>
  `;
  } else {
    return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${currentPath === "/" ? activeClass : defaultClass}">홈</a></li>
        <li><a href="/login" class="text-gray-600 hover:text-blue-400">로그인</a></li>
      </ul>
    </nav>
  `;
  }
};

export { Nav, handleLogout };
