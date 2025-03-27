import { AuthAPI } from "../../interfaces/auth.interface";
import { getRouter } from "../../router";
import { BASE_PATH } from "../../consts/path";
import { NAV_ITEMS } from "../../consts/navigation";

const Header = () => {
  const router = getRouter();
  const path = router.currentPath;

  const getLinkClass = (targetPath) => {
    return path === BASE_PATH + targetPath.replace(/^\//, "")
      ? "text-blue-600 font-bold"
      : "text-gray-600";
  };

  const renderNavLinks = () => {
    if (AuthAPI.isLoggedIn()) {
      return `
        <li><a data-link href="${NAV_ITEMS.HOME.path}" class="${getLinkClass(NAV_ITEMS.HOME.path)}">${NAV_ITEMS.HOME.text}</a></li>
        <li><a data-link href="${NAV_ITEMS.PROFILE.path}" class="${getLinkClass(NAV_ITEMS.PROFILE.path)}">${NAV_ITEMS.PROFILE.text}</a></li>
        <li><a id="logout" href="${NAV_ITEMS.LOGOUT.path}" class="text-gray-600" data-action="logout">${NAV_ITEMS.LOGOUT.text}</a></li>
      `;
    }
    return `
      <li><a data-link href="${NAV_ITEMS.HOME.path}" class="${getLinkClass(NAV_ITEMS.HOME.path)}">${NAV_ITEMS.HOME.text}</a></li>
      <li><a data-link href="${NAV_ITEMS.LOGIN.path}" class="${getLinkClass(NAV_ITEMS.LOGIN.path)}">${NAV_ITEMS.LOGIN.text}</a></li>
    `;
  };

  return `
    <header>
      <div class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </div>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${renderNavLinks()}
        </ul>
      </nav>
    </header>
  `;
};

export default Header;
