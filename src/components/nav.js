import { ROUTES } from "../config/index.js";
import store from "../store/index.js";
const Nav = ({ url }) => {
  const nav = `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${url === ROUTES.MAIN ? "text-blue-600" : "text-gray-600"}">홈</a></li>
        ${
          store.isLogon()
            ? `
            <li><a href="/profile" class="${url === ROUTES.PROFILE ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
            <li><a href="/logout" id="logout" class="text-gray-600">로그아웃</a></li>
          `
            : `
            <li><a href="/login" id="login-link" class="${url === ROUTES.LOGIN ? "text-blue-600" : "text-gray-600"}">로그인</a></li>
            `
        }
      </ul>
    </nav>
  `;

  return nav;
};

export default Nav;
