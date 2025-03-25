import { isLoggedIn } from "../main";
class Header {
  template() {
    return /*HTML*/ `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
    
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600 ${window.location.pathname === "/" && "font-bold"}">홈</a></li>
          <li><a href="/profile" class="text-gray-600 ${window.location.pathname === "/profile" && "font-bold"}">프로필</a></li>
          <li><a href="/login" id="${isLoggedIn() ? "logout" : "login"}" class="text-gray-600">${isLoggedIn() ? "로그아웃" : "로그인"}</a></li>
        </ul>
      </nav>
    `;
  }
}

export default new Header();
