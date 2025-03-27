import { render } from "../main";
import { setLoggedIn, state } from "../store/state";

export const Header = () => {
  const nav = state.loggedIn
    ? /*html*/ `
      <li><a href="/profile" class=${location.pathname === "/profile" ? "text-blue-600" : "text-gray-600"}>프로필</a></li>
      <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`
    : /*html*/ `<li><a href="/login" class="text-gray-600">로그인</a></li>
  `;

  //로그아웃 이벤트
  window.addEventListener("click", (e) => {
    if (e.target.innerHTML === "로그아웃") {
      e.preventDefault();
      setLoggedIn({ newLoggedIn: false });
      localStorage.removeItem("user");
      history.pushState(null, "", "/login");
      render();
    }
  });

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
