import { state } from "../store/state";

export const Header = () => {
  const nav = state.loggedIn
    ? /*html*/ `
      <li><a href="/profile" class=${location.pathname === "/profile" ? "text-blue-600" : "text-gray-600"}>프로필</a></li>
      <li><a href="/logout" id="logout" class="text-gray-600">로그아웃</a></li>`
    : /*html*/ `<li><a href="/login" class="text-gray-600">로그인</a></li>
  `;
  //TODO loggedIn 상태에 따라 헤더 리렌더링

  if (location.pathname === "/logout") {
    //TODO 로그아웃 > 로컬스토리지 삭제, 로그인페이지 이동
    console.log("logout");
  }

  return /*html*/ `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>

  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class=${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}>홈</a></li>
      ${nav}
    </ul>
  </nav>
`;
};
