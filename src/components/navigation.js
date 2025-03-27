// path: ~/Develop/front_5th_chapter1-1/src/components/navigation.js
export const Navigation = () => {
  // 현재 경로 확인
  const currentPath = window.location.pathname;

  // 현재 경로에 따라 클래스 지정
  const homeClass = currentPath === "/#" ? "text-blue-600" : "text-gray-600";
  const profileClass =
    currentPath === "profile" ? "text-blue-600" : "text-gray-600";

  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="nav-link ${homeClass}">홈</a></li>
        <li><a href="/profile" class="nav-link ${profileClass}">프로필</a></li>
        <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
      </ul>
    </nav>
  `;
};
