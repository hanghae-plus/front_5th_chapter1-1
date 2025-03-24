import store from "../../store/store";
import { HEADER_CONTENT } from "../../util/data";

const Header = () => {
  const loggedIn = store.getState().loggedIn;

  const routes = HEADER_CONTENT;
  const navItems = loggedIn
    ? [routes.home, routes.profile, routes.logout]
    : [routes.home, routes.login];

  const nav = navItems
    .map((route) => {
      if (route.id === "logout") {
        return `
          <li>
            <a href="/login" id="logout" class="text-gray-600">로그아웃</a>
          </li>`;
      }
      return `
        <li>
          <a href="${route.path}" class="${location.pathname === route.path ? "text-blue-600" : "text-gray-600"}">${route.content}</a>
        </li>`;
    })
    .join("");

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
  
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${nav}
      </ul>
    </nav>
  `;
};

export default Header;
