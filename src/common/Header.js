import { html } from "./useHtml";

export const Header = (loggedIn) => {
  {
    const presentLink = location.pathname;
    const presentNav = (path) => {
      const isActivate = path === presentLink;
      const activatedClass = isActivate
        ? "text-blue-600 font-bold"
        : "text-gray-600";
      return activatedClass;
    };

    return html`
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      ${loggedIn !== null
        ? html` <nav class="bg-white shadow-md p-2 sticky top-14">
            <ul class="flex justify-around">
              <li>
                <a href="/" class="${presentNav("/")}">홈</a>
              </li>
              <li>
                <a href="/profile" class="${presentNav("/profile")}">프로필</a>
              </li>
              <li>
                <a id="logout" href="#" class="text-gray-600">로그아웃</a>
              </li>
            </ul>
          </nav>`
        : html` <nav class="bg-white shadow-md p-2 sticky top-14">
            <ul class="flex justify-around">
              <li>
                <a href="/" class="${presentNav("/")}">홈</a>
              </li>

              <li><a href="/login" class="text-gray-600">로그인</a></li>
            </ul>
          </nav>`}
    `;
  }
};
