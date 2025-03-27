// 헤더
const Header = (userData) => {
  const isLoggedIn = userData.isLoggedIn();
  // URL 경로 정보 추출: 해시 URL인 경우 해시 값을 가져오고, 아닌 경우 pathname을 사용
  const isHashRouter = window.location.hash !== "";
  const currentPath = isHashRouter
    ? window.location.hash.replace("#", "") || "/"
    : window.location.pathname;

  return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="${isHashRouter ? "#/" : "/"}" class="${currentPath === "/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
          <li><a href="${isHashRouter ? "#/profile" : "/profile"}" class="${currentPath === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>
          ${
            isLoggedIn
              ? `<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`
              : `<li><a href="${isHashRouter ? "#/login" : "/login"}" class="${currentPath === "/login" ? "text-blue-600 font-bold" : "text-gray-600"}">로그인</a></li>`
          }
        </ul>
      </nav>
    `;
};

export default Header;
