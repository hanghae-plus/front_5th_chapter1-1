import { auth } from "../utils/auth.js";

export const Navigation = (currentPath = "/") => {
  const isLoggedIn = auth.isAuthenticated();

  // 현재 URL이 해시 라우터를 사용하는지 확인
  // const isHashRouter = window.location.href.includes("index.hash.html");

  return `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="${currentPath === "/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
      <li><a href="/profile" class="${currentPath === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>
      ${
        isLoggedIn
          ? `<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`
          : `<li><a href="/login" class="${currentPath === "/login" ? "text-blue-600 font-bold" : "text-gray-600"}">로그인</a></li>`
      }
    </ul>
  </nav>
`;
};
