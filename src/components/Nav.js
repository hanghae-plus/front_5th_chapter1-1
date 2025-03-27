import { store } from "../store/store.js";

const Nav = () => {
  const isLoggedIn = store.state.isLoggedIn;
  const currentPath = location.pathname;

  const Link = (href, label) => {
    const isActive = currentPath === href;
    const className = isActive ? "text-blue-600 font-bold" : "text-gray-600";
    return `<li><a href="${href}" class="${className}">${label}</a></li>`;
  };

  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${Link("/", "홈")}
        ${
          isLoggedIn
            ? `
              ${Link("/profile", "프로필")}
              <li><a href="/login" id="logout" class="text-gray-600">로그아웃</a></li>
            `
            : Link("/login", "로그인")
        }
      </ul>
    </nav>
  `;
};

export default Nav;
