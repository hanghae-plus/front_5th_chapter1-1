import { ROUTES_MAP } from "../router/routes";
import { user } from "../store";

export function Nav() {
  const loggedIn = user.loggedIn();
  const currentPathname = window.location.pathname;

  const getActiveClassName = (pathname) => currentPathname === pathname;

  const navItems = loggedIn
    ? /* HTML */ `
        <li>
          <a
            href=${ROUTES_MAP.PROFILE}
            class="${getActiveClassName(ROUTES_MAP.PROFILE)
              ? "text-blue-600 font-bold"
              : "text-gray-600"}"
            >프로필</a
          >
        </li>
        <li>
          <a href="#" id="logout" class="text-gray-600">로그아웃</a>
        </li>
      `
    : /* HTML */ `
        <li>
          <a
            href=${ROUTES_MAP.LOGIN}
            class="${getActiveClassName(ROUTES_MAP.LOGIN)
              ? "text-blue-600 font-bold"
              : "text-gray-600"}"
            >로그인</a
          >
        </li>
      `;

  return /* HTML */ `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a
            href=${ROUTES_MAP.HOME}
            class="${getActiveClassName(ROUTES_MAP.HOME)
              ? "text-blue-600 font-bold"
              : "text-gray-600"}"
            >홈</a
          >
        </li>
        ${navItems}
      </ul>
    </nav>
  `;
}
