import { store } from "../store";
import { NAV_PATH, BASE_URL } from "../constants";

const getActiveLink = (path) => {
  const currentPath = window.location.hash
    ? window.location.hash.slice(1) || "/"
    : window.location.pathname.replace(BASE_URL, "") || "/";
  return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
};

export const Header = () => {
  const { loggedIn } = store.getState();
  const navList = loggedIn
    ? [NAV_PATH.profile, NAV_PATH.logout]
    : [NAV_PATH.login];

  const nav = navList
    .map((item) => {
      if (item.path === NAV_PATH.logout.path) {
        return /*HTML*/ `
        <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
      `;
      }

      return /*HTML*/ `<li><a href="${item.path}" class="${getActiveLink(item.path)}">${item.title}</a></li>`;
    })
    .join("");

  return /*HTML*/ `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${getActiveLink("/")}">홈</a></li>
        ${nav}
      </ul>
    </nav>
  `;
};
