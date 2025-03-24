import { Store } from "../store";

export const header = () => {
  const isLogin = Store.logIn();

  const currentPath = window.location.pathname;

  const loginHTML = isLogin
    ? `
        <li><a href="/profile" data-route-link class="${currentPath === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
        <li><a href="#" id="logout" data-route-link class="text-gray-600">로그아웃</a></li>
        `
    : `<li><a href="/login" data-route-link class="${currentPath === "/login" ? "text-blue-600" : "text-gray-600"}">로그인</a></li>`;

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" data-route-link class=${currentPath === "/" ? "text-blue-600" : "text-gray-600"}>홈</a></li>
      ${loginHTML}
        </ul>
      </nav>`;
};
