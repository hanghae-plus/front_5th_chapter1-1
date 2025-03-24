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
        <li><button class="move-to-home ${isHome ? "text-blue-600" : "text-gray-600"}">홈</button></li>
        <li><button class="move-to-profile ${isProfile ? "text-blue-600" : "text-gray-600"}">프로필</button></li>
        <li>${user ? "<button id='logout' class='text-gray-600'>로그아웃</button>" : "<button id='login' class='text-gray-600'>로그인</button>"}</li>
      </ul>
    </nav>
`;
};
