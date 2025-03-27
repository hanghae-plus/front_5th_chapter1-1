import { PRIVATE_MENU_ITEMS, PUBLIC_MENU_ITEMS } from "../../constants/menu";
import { isLoggedIn, onLogout } from "../../stores/auth";
import { removeBasePath } from "../../utils/routePath";

const Header = () => {
  const init = () => {
    const $nav = document.getElementById("nav");
    if ($nav) {
      $nav.addEventListener("click", (e) => {
        e.preventDefault();

        if (e.target.id === "logout") {
          onLogout();
        } else if (e.target.href && e.target.href !== location.href) {
          window.navigate(e.target.href.replace(location.origin, ""));
        }
      });
    }
  };

  const getClass = (href) => {
    if (location.hash) {
      return location.hash === `#${href}`
        ? "text-blue-600 font-bold"
        : "text-gray-600";
    }

    return removeBasePath(location.pathname) === href
      ? "text-blue-600 font-bold"
      : "text-gray-600";
  };

  const template = /* html */ `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav id="nav" class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${(isLoggedIn() ? PRIVATE_MENU_ITEMS : PUBLIC_MENU_ITEMS)
          .map(
            (menu) =>
              `<li><a href=${menu.href} class="${getClass(menu.href)}" ${menu.id ? `id=${menu.id}` : ""}>${menu.name}</a></li>`,
          )
          .join("")}
      </ul>
    </nav>
  `;

  return {
    init,
    template,
  };
};

export default Header;
