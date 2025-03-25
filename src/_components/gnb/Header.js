import { Router } from "../../router";

export const Header = () => {
  const isLoggedIn = localStorage.getItem("userInfo") !== null;

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a href="/" class="text-gray-600">홈</a>
        </li>
        ${
          isLoggedIn
            ? `
              <li>
                <a href="/profile" class="text-blue-600">프로필</a>
              </li>
              <li>
                <a href="/logout" class="text-gray-600">로그아웃</a>
              </li>
            `
            : `
              <li>
                <a href="/login" class="text-blue-600">로그인</a>
              </li>
            `
        }
      </ul>
    </nav>
  `;
};
document.addEventListener("click", (event) => {
  if (event.target.matches('a[href="/logout"]')) {
    event.preventDefault(); // 기본 동작 방지

    // localStorage에서 사용자 정보 삭제!!!!!!!!!!
    localStorage.removeItem("userInfo");

    // 메인 페이지로 리다이렉트!!!!!!!!!!!!
    window.history.pushState({}, "", "/");
    Router.Render(); //
  }
});
