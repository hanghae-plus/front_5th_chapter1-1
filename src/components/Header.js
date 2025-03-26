import { state } from "../store/state.js";
import { ROUTE_PATHS } from "../router/routes.js";

export const Header = () => {
  const loggedIn = state.loggedIn;

  const getNavClassName = (path) =>
    location.pathname === path ? "text-blue-600 font-bold" : "text-gray-600";

  const navContent = loggedIn
    ? `
      <li><a href="${ROUTE_PATHS.PROFILE}" class="${getNavClassName(ROUTE_PATHS.PROFILE)}">프로필</a></li>
      <li><a id="logout" href="#">로그아웃</a></li>
  `
    : `
      <li><a href="${ROUTE_PATHS.LOGIN}" class="${getNavClassName(ROUTE_PATHS.LOGIN)}">로그인</a></li>
    `;

  return `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="${ROUTE_PATHS.MAIN}" class="${getNavClassName(ROUTE_PATHS.MAIN)}">홈</a></li>
      ${navContent}
    </ul>
  </nav>
`;
};
