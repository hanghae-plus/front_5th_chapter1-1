import isLoggedIn from "../utils/Islogin";
import Header from "./Header";
const Nav = () => {
  const isHome = () => {
    const isHome = window.location.pathname === "/";
    return isHome ? true : false;
  };
  const isProfile = () => {
    const isProfile = window.location.pathname === "/profile";
    return isProfile ? true : false;
  };

  return `
  ${Header()}
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" id="home" class="${isHome() ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
      ${isLoggedIn() ? `<li><a href="/profile" id="profile" class="${isProfile() ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>` : ``}
      ${
        isLoggedIn()
          ? `<li><a href="/logout" id="logout" class="text-gray-600">로그아웃</a></li>`
          : `<li><a href="/login" id="login" class="text-gray-600">로그인</a></li>`
      }
    </ul>
  </nav>
    `;
};

export default Nav;
