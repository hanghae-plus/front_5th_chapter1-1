import { Store } from "../store";

export const header = () => {
  const isProd = location.hostname.includes("github.io");
  const BASE_PATH = isProd ? "/front_5th_chapter1-1" : "";
  const isLogin = Store.logIn();

  const isLocationHash = location.hash;

  const currentPath = isLocationHash
    ? location.hash.replace(/^#/, "")
    : window.location.pathname;

  const loginHTML = isLogin
    ? `
        <li><a href="${BASE_PATH}/profile" data-route-link class="${currentPath === `${BASE_PATH}/profile` ? "text-blue-600  font-bold" : "text-gray-600"}">프로필</a></li>
        <li><a href="#" id="logout"  class="text-gray-600">로그아웃</a></li>
        `
    : `<li><a href="${BASE_PATH}/login" data-route-link class="${currentPath === `${BASE_PATH}/login` ? "text-blue-600  font-bold" : "text-gray-600"}">로그인</a></li>`;

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="${BASE_PATH}/" data-route-link class="${currentPath === `${BASE_PATH}/` ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
      ${loginHTML}
        </ul>
      </nav>`;
};
