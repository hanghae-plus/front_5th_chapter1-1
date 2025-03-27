import { ROUTES } from "../config/index.js";
import store from "../store/index.js";
const Nav = ({ url }) => {
  const isActive = (route) => {
    return route === url ? "text-blue-600 font-bold" : "text-gray-600";
  };
  const nav = `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${isActive(ROUTES.MAIN)}">홈</a></li>
        ${
          store.isLogon()
            ? `
            <li><a href="/profile" class="${isActive(ROUTES.PROFILE)}">프로필</a></li>
            <li><a href="/logout" id="logout" class="text-gray-600">로그아웃</a></li>
          `
            : `
            <li><a href="/login" id="login-link" class="${isActive(ROUTES.LOGIN)}">로그인</a></li>
            `
        }
      </ul>
    </nav>
  `;

  return nav;
};

export default Nav;
