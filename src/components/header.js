import { getPath, pushState } from "../router";
import { ROUTE } from "../shared/route";
import { removeStoreValue } from "../utils/local-storage";
import { store } from "../shared/store";

const getHeaderClassName = (targetPath) => {
  const currentPath = getPath();

  return currentPath === targetPath
    ? "text-blue-600 font-bold"
    : "text-gray-600";
};

const renderNavList = () => {
  return store.getState("isLoggedIn")
    ? `
        <li><a href="${ROUTE.profile}" class="${getHeaderClassName(ROUTE.profile)}">프로필</a></li>
        <li><a id="logout" href="${ROUTE.login}" class="text-gray-600">로그아웃</a></li>
      `
    : `<li><a href="${ROUTE.login}" class="text-gray-600">로그인</a></li>`;
};

export const Header = () => /*html*/ `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>

  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="${ROUTE.main}" class="${getHeaderClassName(ROUTE.main)}">홈</a></li>
      ${renderNavList()}
    </ul>
  </nav>
`;

window.addEventListener("click", (e) => {
  if (!e.target.matches("a[href]")) return;

  const href = e.target.getAttribute("href");
  const isLogoutButton = e.target.id === "logout";
  const isSamePage = href === getPath();

  e.preventDefault();

  if (isSamePage) return;

  if (isLogoutButton) {
    removeStoreValue("user");
    removeStoreValue("password");
    removeStoreValue("isLoggedIn");
  }

  pushState(e.target.pathname);
  window.dispatchEvent(new Event("popstate"));
});
