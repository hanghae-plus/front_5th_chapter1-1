import { getData } from "../utils/localStorage";
import { isHash } from "../utils/isHash";

export const Header = () => {
  const user = getData("user", null);
  const currentPath = location.pathname;
  const currentHash = location.hash;

  // console.log(currentPath);
  // console.log(isHash);
  // console.log(location.hash);

  const isHome = isHash ? currentHash === "#/" : currentPath === "/";
  const isProfile = isHash
    ? currentHash === "#/profile"
    : currentPath === "/profile";
  const homeUrl = "/";
  const profileUrl = "/profile";
  const loginUrl = "/login";
  return /*html*/ ` 
  <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="${homeUrl}" class="move-to-home ${isHome ? "text-blue-600 font-bold" : "text-gray-600 font-normal"}">홈</a></li>
        <li><a href="${profileUrl}" class="move-to-profile ${isProfile ? "text-blue-600 font-bold" : "text-gray-600 font-normal"}">프로필</a></li>
        <li>${user ? `<a href='${loginUrl}' id='logout' class='text-gray-600 font-normal'>로그아웃</a>` : `<a href='${loginUrl}' id='login' class='text-gray-600 font-normal'>로그인</a>`}</li>
      </ul>
    </nav>
`;
};
