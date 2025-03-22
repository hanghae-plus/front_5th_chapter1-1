import { CUSTOM_EVENT, ROUTES } from "../config/index.js";
import { $CE } from "../utils/create-component.js";

const Nav = ({ url, isLogon }) => {
  const navigate = (e) => {
    e.preventDefault();
    let url = e.target.getAttribute("href");
    if (url === ROUTES.LOGOUT) {
      localStorage.setItem("username", "");
      url = ROUTES.MAIN;
    }
    const config = { detail: { url }, bubbles: true, cancelable: true };
    document.dispatchEvent(new CustomEvent(CUSTOM_EVENT.PAGE_PUSH, config));
    // 구현중
  };
  const nav = $CE(`
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${url === ROUTES.MAIN ? "text-blue-600" : "text-gray-600"}">홈</a></li>
          ${
            isLogon
              ? `
              <li><a href="/profile"  class="${url === ROUTES.PROFILE ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
              <li><a href="/logout" class="text-gray-600">로그아웃</a></li>
            `
              : `
              <li><a href="/login"  class="${url === ROUTES.LOGIN ? "text-blue-600" : "text-gray-600"}">로그인</a></li>
              `
          }
        </ul>
      </nav>
    `);

  nav.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", navigate);
  });
  return nav;
};

export default Nav;
