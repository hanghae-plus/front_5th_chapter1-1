import {
  loggedInAccessRoutes,
  loggedOutAccessRoutes,
} from "../../_constants/route";
import states from "../../_states";

const Header = () => {
  const pathname = states.pathname;

  const isLoggedIn = states.isLoggedIn;

  const getNavItems = () => {
    if (isLoggedIn) {
      return loggedInAccessRoutes
        .map(
          (route) =>
            `<li><a id="${route.id}" href="${route.path}" class="${pathname === route.path ? "text-blue-600 font-bold" : "text-gray-600"}">${route.title}</a></li>`,
        )
        .join("");
    }

    return loggedOutAccessRoutes
      .map(
        (route) => `
        <li><a id="${route.id}" href="${route.path}" class="${pathname === route.path ? "text-blue-600" : "text-gray-600"}">${route.title}</a></li>
      `,
      )
      .join("");
  };

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${getNavItems()}
      </ul>
    </nav>
  `;
};

export default Header;
