import { getData } from "../utils/localStorage";

export const Header = () => {
  const user = getData("user", null);
  const currentPath = location.pathname;

  const isHome = currentPath === "/";
  const isProfile = currentPath === "/profile";

  return /*html*/ ` 
  <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="move-to-home ${isHome ? "text-blue-600 font-bold" : "text-gray-600 font-normal"}">홈</a></li>
        <li><a href="/profile" class="move-to-profile ${isProfile ? "text-blue-600 font-bold" : "text-gray-600 font-normal"}">프로필</a></li>
        <li>${user ? "<a href='/login' id='logout' class='text-gray-600 font-normal'>로그아웃</a>" : "<a href='/login' id='login' class='text-gray-600 font-normal'>로그인</a>"}</li>
      </ul>
    </nav>
`;
};
