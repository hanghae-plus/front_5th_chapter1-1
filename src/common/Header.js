import { router } from "../router";
import { setUser, state } from "../util/store";

export const Header = {
  getHtml: () => {
    const path = location.pathname;
    const isLoggedIn = state.user;

    const currentNavMenu = (menu) => {
      return path === menu ? "text-blue-600 font-bold" : "text-gray-600";
    };

    const handleClick = (event) => {
      if (event.target.id === "logout") {
        event.preventDefault();
        setUser(null);
        history.pushState(null, null, "/login");
        router();
        // console.log("Button clicked", event);  // 이 주석 풀면 로그가 2번 찍히는데 왜 그런걸까?
      }
    };
    document.addEventListener("click", handleClick);

    const loggedInNav = isLoggedIn
      ? /*html*/ `
              <li><a href="/profile" data-link class="${currentNavMenu("/profile")}">프로필</a></li>
              <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`
      : /*html*/ `<li><a href="/login" data-link class="text-gray-600">로그인</a></li>`;

    return /*html*/ `
      <div>
          <header class="bg-blue-600 text-white p-4 sticky top-0">
            <h1 class="text-2xl font-bold">항해플러스</h1>
          </header>
          <nav class="bg-white shadow-md p-2 sticky top-14">
            <ul class="flex justify-around">
              <li><a href="/" data-link class="${currentNavMenu("/")}">홈</a></li>
              ${loggedInNav}
            </ul>
          </nav>
      </div>
    `;
  },
};
