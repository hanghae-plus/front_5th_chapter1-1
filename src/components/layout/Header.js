import { userStore } from "../../store/store";

export const Header = () => {
  const isLoggedIn = userStore.loggedIn();
  const num = location.href.split("/").length;
  const path = location.href.split("/")[num - 1];

  const renderNavItem = () => {
    if (isLoggedIn) {
      return /* HTML */ `<li>
          <a
            href="/profile"
            class="${path === "profile"
              ? "text-blue-600 font-bold"
              : "text-gray-600"}"
            >프로필</a
          >
        </li>
        <li><a id="logout" href="#" class="text-gray-600">로그아웃</a></li>`;
    } else {
      return /* HTML */ `<li>
        <a href="/login" class="text-gray-600">로그인</a>
      </li>`;
    }
  };

  return /* HTML */ `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a
            href="/"
            class="${path === "" ? "text-blue-600 font-bold" : "text-gray-600"}"
            >홈</a
          >
        </li>
        ${renderNavItem()}
      </ul>
    </nav>
  `;
};
